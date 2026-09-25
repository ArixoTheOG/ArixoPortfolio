import { NextRequest, NextResponse } from "next/server";
import { isValidUsername, resolveProfile } from "@/lib/minecraft-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/minecraft/profile?username=ArshuPremium
 *
 * Server-side proxy over Mojang's public profile API with in-memory
 * caching (see lib/minecraft-server.ts). Keeps rate limits healthy and
 * avoids CORS/mixed-content problems in the browser.
 */
export async function GET(req: NextRequest) {
  const username =
    req.nextUrl.searchParams.get("username")?.trim() ?? "";

  if (!isValidUsername(username)) {
    return NextResponse.json(
      { error: "invalid_username" },
      { status: 400, headers: { "cache-control": "no-store" } }
    );
  }

  const result = await resolveProfile(username);

  if ("notFound" in result) {
    return NextResponse.json(
      { error: "not_found", username },
      { status: 404, headers: { "cache-control": "public, max-age=300" } }
    );
  }

  if ("error" in result) {
    return NextResponse.json(
      { error: "upstream_unavailable" },
      { status: 502, headers: { "cache-control": "no-store" } }
    );
  }

  const { profile } = result;
  return NextResponse.json(
    {
      name: profile.name,
      uuid: profile.uuid,
      model: profile.model,
      hasCape: profile.hasCape,
      fetchedAt: profile.fetchedAt,
      source: "mojang",
      // Note: raw texture URLs are intentionally NOT exposed to the client;
      // images are served through /api/minecraft/skin for caching + https.
    },
    {
      status: 200,
      headers: {
        "cache-control": "public, max-age=60, s-maxage=600, stale-while-revalidate=3600",
      },
    }
  );
}
