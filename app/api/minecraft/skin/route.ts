import { NextRequest, NextResponse } from "next/server";
import { fetchTextureBytes, isValidUsername } from "@/lib/minecraft-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/minecraft/skin?username=ArshuPremium[&part=cape]
 *
 * Streams the player's skin (or cape) PNG from Mojang's texture servers
 * through our origin, so the browser gets:
 *   - same-origin images (no CORS/mixed-content issues for WebGL),
 *   - strong HTTP caching (the texture hash only changes on skin updates),
 *   - a single upstream request per cache window.
 */
export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username")?.trim() ?? "";
  const part = req.nextUrl.searchParams.get("part") === "cape" ? "cape" : "skin";

  if (!isValidUsername(username)) {
    return NextResponse.json(
      { error: "invalid_username" },
      { status: 400, headers: { "cache-control": "no-store" } }
    );
  }

  const result = await fetchTextureBytes(username, part);

  if ("notFound" in result) {
    return NextResponse.json(
      { error: "not_found" },
      { status: 404, headers: { "cache-control": "public, max-age=300" } }
    );
  }
  if ("error" in result) {
    return NextResponse.json(
      { error: "upstream_unavailable" },
      { status: 502, headers: { "cache-control": "no-store" } }
    );
  }

  return new NextResponse(result.bytes, {
    status: 200,
    headers: {
      "content-type": result.contentType || "image/png",
      "cache-control": "public, max-age=1800, s-maxage=86400, stale-while-revalidate=604800",
      "x-content-type-options": "nosniff",
    },
  });
}
