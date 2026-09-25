import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { portfolioConfig } from "@/lib/config";

export const runtime = "nodejs";
export const alt = portfolioConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic Open Graph image — dark branded card.
 * Fonts are bundled locally (SpaceMono TTFs) so this route never depends on
 * external networks. Styles stay within satori's supported CSS subset.
 */
export default async function OpengraphImage() {
  const monoBold = readFileSync(
    path.join(process.cwd(), "app/fonts/SpaceMono-Bold.ttf")
  );
  const monoRegular = readFileSync(
    path.join(process.cwd(), "app/fonts/SpaceMono-Regular.ttf")
  );

  const green = "#4ade80";
  const bg = "#06080b";
  const muted = "#93a1b1";
  const text = "#e8eef4";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: bg,
          fontFamily: "SpaceMono",
          color: text,
          padding: "64px 76px",
        }}
      >
        {/* green glow, top-right */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 900,
            height: 640,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.30), rgba(34,197,94,0) 66%)",
          }}
        />
        {/* cyan glow, bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -200,
            width: 820,
            height: 560,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.16), rgba(34,211,238,0) 66%)",
          }}
        />
        {/* subtle top hairline for structure */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 3,
            backgroundColor: "rgba(74,222,128,0.55)",
            display: "flex",
          }}
        />

        {/* ===== top row ===== */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="52" height="52" viewBox="0 0 32 32">
              <path d="M16 3 L28 9.5 L16 16 L4 9.5 Z" fill="#4ade80" />
              <path d="M4 9.5 L16 16 L16 29 L4 22.5 Z" fill="#166534" />
              <path d="M28 9.5 L16 16 L16 29 L28 22.5 Z" fill="#14532d" />
            </svg>
            <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: text }}>
              ARIXO.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid rgba(74,222,128,0.45)",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 19,
              color: green,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: green,
                display: "flex",
              }}
            />
            AVAILABLE FOR PAID WORK
          </div>
        </div>

        {/* ===== center ===== */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 20 }}>
          <div style={{ display: "flex", fontSize: 78, letterSpacing: 1, color: green, lineHeight: 1.05 }}>
            Minecraft Developer
          </div>
          <div style={{ display: "flex", fontSize: 34, color: text, letterSpacing: 0.5 }}>
            SysAdmin · Discord Developer · Pterodactyl Specialist
          </div>
          <div style={{ display: "flex", fontSize: 22, color: muted, maxWidth: 940, lineHeight: 1.55 }}>
            Minecraft servers, Pterodactyl infrastructure, Discord bots, websites,
            and VPS administration — built, deployed, and maintained.
          </div>
        </div>

        {/* ===== bottom chips ===== */}
        <div style={{ display: "flex", gap: 20, alignItems: "center", width: "100%" }}>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(148,163,184,0.3)",
              borderRadius: 12,
              padding: "12px 24px",
              fontSize: 22,
              color: text,
            }}
          >
            <div style={{ display: "flex", color: muted, marginRight: 12 }}>Minecraft:</div>
            ArshuPremium
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(88,101,242,0.55)",
              borderRadius: 12,
              padding: "12px 24px",
              fontSize: 22,
              color: "#c7cdfb",
            }}
          >
            <div style={{ display: "flex", color: muted, marginRight: 12 }}>Discord:</div>
            adminx.in
          </div>
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 20, color: "#5c6b7c" }}>
            portfolio · 2026
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SpaceMono", data: monoRegular, weight: 400, style: "normal" },
        { name: "SpaceMono", data: monoBold, weight: 700, style: "normal" },
      ],
    }
  );
}
