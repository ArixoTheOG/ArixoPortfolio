import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arixo — Minecraft Developer & SysAdmin",
    short_name: "Arixo",
    description:
      "Minecraft servers, Pterodactyl infrastructure, Discord bots, websites, and Linux/VPS administration.",
    start_url: "/",
    display: "standalone",
    background_color: "#06080b",
    theme_color: "#06080b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
