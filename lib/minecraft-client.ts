"use client";

/**
 * Client-side access to the Minecraft profile data served by our own
 * server-side proxy (/api/minecraft/*). Results are cached in-memory so
 * multiple components never trigger duplicate network requests, and the
 * Mojang API is never hammered per render.
 */
import { useEffect, useState } from "react";
import { portfolioConfig } from "@/lib/config";

export type MinecraftProfile = {
  name: string;
  uuid: string;
  model: "default" | "slim";
  hasCape: boolean;
  fetchedAt: number;
};

type Result =
  | { status: "loading" }
  | { status: "ok"; data: MinecraftProfile }
  | { status: "error"; reason: "not_found" | "upstream" | "unknown" };

let profilePromise: Promise<Result> | null = null;
let skinBlobUrl: string | null = null;
let skinPromise: Promise<string | null> | null = null;

const username = portfolioConfig.minecraftUsername;

export function getMinecraftProfile(): Promise<Result> {
  if (!profilePromise) {
    profilePromise = fetch(`/api/minecraft/profile?username=${encodeURIComponent(username)}`, {
      headers: { accept: "application/json" },
    })
      .then(async (r) => {
        const body = await r.json().catch(() => ({}));
        if (r.ok && body?.name && body?.uuid) {
          return {
            status: "ok",
            data: {
              name: body.name as string,
              uuid: body.uuid as string,
              model: (body.model ?? "default") as "default" | "slim",
              hasCape: Boolean(body.hasCape),
              fetchedAt: Number(body.fetchedAt ?? Date.now()),
            },
          } as Result;
        }
        return {
          status: "error",
          reason: body?.error === "not_found" ? "not_found" : r.status >= 500 ? "upstream" : "unknown",
        } as Result;
      })
      .catch(() => ({ status: "error", reason: "upstream" } as Result));
  }
  return profilePromise;
}

/** Object URL for the proxied skin PNG (cached for the page lifetime). */
export function getSkinUrl(): Promise<string | null> {
  if (skinBlobUrl) return Promise.resolve(skinBlobUrl);
  if (!skinPromise) {
    skinPromise = fetch(`/api/minecraft/skin?username=${encodeURIComponent(username)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`skin fetch failed: ${r.status}`);
        const blob = await r.blob();
        skinBlobUrl = URL.createObjectURL(blob);
        return skinBlobUrl;
      })
      .catch(() => null);
  }
  return skinPromise;
}

/** Object URL for the proxied cape PNG, or null when unavailable. */
export function getCapeUrl(): Promise<string | null> {
  return fetch(`/api/minecraft/skin?username=${encodeURIComponent(username)}&part=cape`)
    .then(async (r) => (r.ok ? URL.createObjectURL(await r.blob()) : null))
    .catch(() => null);
}

/** React hook wrapper around the cached profile fetch. */
export function useMinecraftProfile(): Result {
  const [result, setResult] = useState<Result>({ status: "loading" });
  useEffect(() => {
    let alive = true;
    getMinecraftProfile().then((r) => alive && setResult(r));
    return () => {
      alive = false;
    };
  }, []);
  return result;
}

/** Reset caches (used by the "retry" button after failures). */
export function resetMinecraftCaches() {
  profilePromise = null;
  skinPromise = null;
  if (skinBlobUrl) {
    URL.revokeObjectURL(skinBlobUrl);
    skinBlobUrl = null;
  }
}
