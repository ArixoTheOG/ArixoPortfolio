/**
 * Server-only helper: resolves a Minecraft username to UUID + skin/cape
 * textures through Mojang's public API.
 *
 * - No API key is required (public endpoints). The MINECRAFT_API_KEY env
 *   placeholder exists only for future third-party providers and is read
 *   exclusively on the server.
 * - Results are cached in memory with a TTL so repeated page views never
 *   hammer Mojang.
 * - On upstream failure, a stale cache entry is served if one exists.
 */

export type MojangProfile = {
  name: string;
  uuid: string; // dashed
  rawUuid: string;
  skinUrl: string | null; // https, textures.minecraft.net
  capeUrl: string | null;
  model: "default" | "slim";
  hasCape: boolean;
  fetchedAt: number;
};

const TTL_MS = 10 * 60 * 1000; // 10 minutes
const FETCH_TIMEOUT_MS = 8000;

type CacheEntry = { at: number; data: MojangProfile | null; notFound: boolean };
const cache = new Map<string, CacheEntry>();

const USERNAME_RE = /^[A-Za-z0-9_]{3,16}$/;

export function isValidUsername(username: string): boolean {
  return USERNAME_RE.test(username);
}

function dashUuid(raw: string): string {
  const h = raw.replace(/-/g, "");
  if (h.length !== 32) return raw;
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function toHttps(url: string): string {
  // textures.minecraft.net supports https — required to avoid mixed content.
  return url.replace(/^http:\/\//i, "https://");
}

async function fetchWithTimeout(url: string): Promise<Response> {
  return fetch(url, {
    cache: "no-store",
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

/**
 * Resolve a profile. Returns:
 *  - { profile } on success
 *  - { notFound: true } when Mojang says the username does not exist
 *  - { error: true, stale? } when the upstream is unreachable
 */
export async function resolveProfile(username: string): Promise<
  | { profile: MojangProfile }
  | { notFound: true }
  | { error: true; stale?: MojangProfile }
> {
  const key = username.toLowerCase();
  const now = Date.now();

  const cached = cache.get(key);
  if (cached && now - cached.at < TTL_MS) {
    if (cached.notFound) return { notFound: true };
    if (cached.data) return { profile: cached.data };
  }

  try {
    // 1) username -> uuid
    const profileRes = await fetchWithTimeout(
      `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username)}`
    );
    if (profileRes.status === 204 || profileRes.status === 404) {
      cache.set(key, { at: now, data: null, notFound: true });
      return { notFound: true };
    }
    if (!profileRes.ok) throw new Error(`mojang profile http ${profileRes.status}`);
    const { id, name } = (await profileRes.json()) as { id: string; name: string };
    if (!id || !name) throw new Error("malformed mojang profile response");

    // 2) uuid -> textures
    let skinUrl: string | null = null;
    let capeUrl: string | null = null;
    let model: "default" | "slim" = "default";

    const sessionRes = await fetchWithTimeout(
      `https://sessionserver.mojang.com/session/minecraft/profile/${encodeURIComponent(id)}`
    );
    if (sessionRes.ok) {
      const session = (await sessionRes.json()) as {
        properties?: Array<{ name: string; value: string }>;
      };
      const textureProp = session.properties?.find((p) => p.name === "textures");
      if (textureProp?.value) {
        try {
          const decoded = JSON.parse(Buffer.from(textureProp.value, "base64").toString("utf8")) as {
            textures?: {
              SKIN?: { url?: string; metadata?: { model?: string } };
              CAPE?: { url?: string };
            };
          };
          if (decoded.textures?.SKIN?.url) {
            skinUrl = toHttps(decoded.textures.SKIN.url);
            model = decoded.textures.SKIN.metadata?.model === "slim" ? "slim" : "default";
          }
          if (decoded.textures?.CAPE?.url) {
            capeUrl = toHttps(decoded.textures.CAPE.url);
          }
        } catch {
          /* texture decode failure -> serve profile without skin */
        }
      }
    }

    const profile: MojangProfile = {
      name,
      uuid: dashUuid(id),
      rawUuid: id,
      skinUrl,
      capeUrl,
      model,
      hasCape: Boolean(capeUrl),
      fetchedAt: now,
    };
    cache.set(key, { at: now, data: profile, notFound: false });
    return { profile };
  } catch {
    // Upstream unreachable — serve stale cache when we have it.
    if (cached?.data) return { error: true, stale: cached.data };
    return { error: true };
  }
}

/** Fetch raw texture bytes (skin or cape) for proxying. */
export async function fetchTextureBytes(
  username: string,
  part: "skin" | "cape"
): Promise<{ bytes: ArrayBuffer; contentType: string } | { notFound: true } | { error: true }> {
  const resolved = await resolveProfile(username);
  if ("notFound" in resolved) return { notFound: true };
  const profile = "profile" in resolved ? resolved.profile : resolved.stale;
  if (!profile) return { error: true };
  const url = part === "cape" ? profile.capeUrl : profile.skinUrl;
  if (!url) return { notFound: true };
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) return { error: true };
    const contentType = res.headers.get("content-type") ?? "image/png";
    return { bytes: await res.arrayBuffer(), contentType };
  } catch {
    return { error: true };
  }
}
