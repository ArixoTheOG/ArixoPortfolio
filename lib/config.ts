/**
 * ============================================================================
 *  portfolioConfig — central data file for the entire website.
 * ----------------------------------------------------------------------------
 *  Edit this file to update the portfolio. Every section, card, chip and
 *  terminal command on the site reads from here — no component edits needed.
 *
 *  Content policy: only factual information. Do not add fake client names,
 *  revenue, uptime percentages, user counts, awards or certifications.
 * ============================================================================
 */

export const portfolioConfig = {
  /** Identity ---------------------------------------------------------- */
  name: "Arixo",
  headline: "Hi, I'm Arixo.",
  roleLine: "Minecraft Developer • SysAdmin • Developer",
  heroDescription:
    "I build, configure, and manage Minecraft servers, Discord communities, bots, websites, and production-ready infrastructure.",
  minecraftUsername: "ArshuPremium",
  discord: "adminx.in",
  availability: "Available for Paid Work",
  paidNotice:
    "All development and infrastructure services are paid. Contact me for requirements and pricing.",

  /** SEO ---------------------------------------------------------------- */
  seo: {
    title: "Arixo — Minecraft Developer & SysAdmin",
    description:
      "Arixo is a Minecraft developer and SysAdmin specializing in Minecraft servers, Pterodactyl infrastructure, Discord bots, websites, VPS administration, and server development.",
    keywords: [
      "Minecraft developer",
      "Minecraft server setup",
      "SysAdmin",
      "Pterodactyl",
      "Wings",
      "Discord bot development",
      "Linux VPS administration",
      "server hosting infrastructure",
      "ArshuPremium",
    ],
  },

  /** Navigation ---------------------------------------------------------- */
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  /** About --------------------------------------------------------------- */
  about: {
    intro:
      "I'm a Minecraft-focused developer and SysAdmin who enjoys building reliable infrastructure, game servers, Discord communities, automation systems, and modern web experiences.",
    body: [
      "My work sits where gaming meets operations: a Minecraft server is only as good as the machine, network, and panel behind it. I handle the whole stack — from tuning Paper configs and writing plugins' settings, to hardening Linux VPS boxes, deploying Pterodactyl + Wings, and shipping the Discord bots and websites that wrap around it all.",
      "Every engagement is treated like production work: versioned configs, sane backups, least-privilege permissions, documented handover, and clear communication on Discord.",
    ],
    focusAreas: [
      "Minecraft server development",
      "Server configuration",
      "Linux administration",
      "VPS management",
      "Pterodactyl",
      "Wings",
      "Discord development",
      "Discord bots",
      "Web development",
      "AI-assisted development",
      "Hosting infrastructure",
      "Server optimization",
      "Automation",
    ],
    discordRole: "Developer / SysAdmin",
  },

  /** Skills — grouped by category, no fake percentages ------------------- */
  skillCategories: [
    {
      id: "minecraft",
      index: "cat_01",
      title: "Minecraft",
      icon: "pickaxe" as const,
      blurb: "Server stacks, gameplay tuning, and keeping TPS healthy.",
      skills: [
        "Minecraft Server Setup",
        "Paper",
        "Spigot",
        "Purpur",
        "Fabric",
        "Forge",
        "Server Optimization",
        "Plugin Configuration",
        "Mod Configuration",
        "Performance Optimization",
        "Server Management",
      ],
    },
    {
      id: "sysadmin",
      index: "cat_02",
      title: "Infrastructure / SysAdmin",
      icon: "server" as const,
      blurb: "Linux-first operations: secure, monitored, recoverable.",
      skills: [
        "Linux",
        "Ubuntu",
        "Debian",
        "VPS Management",
        "SSH",
        "Bash",
        "Nginx",
        "Cloudflare",
        "DNS",
        "SSL",
        "Firewall Configuration",
        "Server Monitoring",
        "Backup Systems",
        "Networking",
      ],
    },
    {
      id: "pterodactyl",
      index: "cat_03",
      title: "Pterodactyl",
      icon: "panel" as const,
      blurb: "Panels, daemons, nodes — game hosting done properly.",
      skills: [
        "Pterodactyl Panel",
        "Wings",
        "Node Setup",
        "Egg Configuration",
        "Allocation Management",
        "Server Deployment",
        "Panel Configuration",
        "Reverse Proxy",
        "Cloudflare Integration",
        "Server Management",
      ],
    },
    {
      id: "development",
      index: "cat_04",
      title: "Development",
      icon: "code" as const,
      blurb: "Modern web + automation, with AI as a force multiplier.",
      skills: [
        "Python",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "React",
        "Node.js",
        "REST APIs",
        "Automation",
        "AI-assisted development",
      ],
    },
    {
      id: "discord",
      index: "cat_05",
      title: "Discord",
      icon: "discord" as const,
      blurb: "Communities and bots that run themselves.",
      skills: [
        "Discord Bots",
        "Discord.js / Python Discord",
        "Moderation Systems",
        "Ticket Systems",
        "Verification Systems",
        "Server Automation",
        "Role Systems",
        "Custom Commands",
        "API integrations",
      ],
    },
  ],

  /** Services — all paid -------------------------------------------------- */
  services: [
    {
      id: "minecraft-server",
      number: "S-01",
      icon: "blocks" as const,
      title: "Minecraft Server Development",
      description:
        "Complete Minecraft server setup, configuration, optimization, plugins, permissions, gameplay systems, and production deployment.",
      features: [
        "Server setup",
        "Plugin configuration",
        "Performance optimization",
        "Permissions",
        "Custom configurations",
        "Production deployment",
      ],
    },
    {
      id: "pterodactyl",
      number: "S-02",
      icon: "panel" as const,
      title: "Pterodactyl Setup",
      description:
        "Complete Pterodactyl infrastructure setup for managing Minecraft, Discord bots, applications, and other services.",
      features: [
        "Panel installation",
        "Wings setup",
        "Node configuration",
        "SSL",
        "Reverse proxy",
        "Cloudflare",
        "Allocations",
        "Server deployment",
      ],
    },
    {
      id: "discord-server",
      number: "S-03",
      icon: "community" as const,
      title: "Discord Server Development",
      description:
        "Professional Discord server setup with structured roles, channels, permissions, moderation, tickets, verification, and automation.",
      features: [
        "Role & channel structure",
        "Permissions design",
        "Moderation setup",
        "Ticket systems",
        "Verification flow",
        "Community automation",
      ],
    },
    {
      id: "discord-bot",
      number: "S-04",
      icon: "bot" as const,
      title: "Discord Bot Development",
      description:
        "Custom Discord bots designed around your community, hosting business, or automation requirements.",
      features: [
        "Moderation",
        "Tickets",
        "Verification",
        "Welcome systems",
        "Custom commands",
        "APIs",
        "Automation",
        "Database integration",
      ],
    },
    {
      id: "web",
      number: "S-05",
      icon: "globe" as const,
      title: "Web Development",
      description:
        "Modern websites and dashboards built for Minecraft servers, hosting companies, communities, and personal brands.",
      features: [
        "Landing pages",
        "Dashboards",
        "Portfolio websites",
        "Hosting websites",
        "API integration",
        "Responsive UI",
      ],
    },
    {
      id: "linux-vps",
      number: "S-06",
      icon: "terminal" as const,
      title: "Linux / VPS Administration",
      description:
        "Server setup, configuration, security, deployment, troubleshooting, and maintenance for Linux VPS infrastructure.",
      features: [
        "Secure server setup",
        "SSH & firewall hardening",
        "Nginx / reverse proxy",
        "Deployment pipelines",
        "Monitoring & backups",
        "Troubleshooting",
      ],
    },
  ],

  /** Projects — factual entries only; edit freely ------------------------- */
  projects: [
    {
      id: "nova-cloud",
      title: "Nova Cloud",
      category: "Minecraft Hosting / Infrastructure",
      description:
        "Minecraft hosting infrastructure with Pterodactyl-based server management and custom automation.",
      tech: ["Pterodactyl", "Wings", "Linux", "Nginx", "Cloudflare", "Bash"],
      visual: "cloud" as const,
    },
    {
      id: "epyc-node",
      title: "Epyc Node",
      category: "Hosting Infrastructure",
      description:
        "Hosting infrastructure and server deployment systems focused on Minecraft, VPS, and bot hosting.",
      tech: ["VPS", "Ubuntu", "Allocations", "SSL", "Firewall", "Monitoring"],
      visual: "node" as const,
    },
    {
      id: "discord-bots",
      title: "Custom Discord Bots",
      category: "Discord Development",
      description:
        "Custom Discord bots with moderation, tickets, queues, server management, APIs, and automation.",
      tech: ["Discord.js", "Node.js", "Python", "REST APIs", "Databases"],
      visual: "bot" as const,
    },
    {
      id: "pterodactyl-infra",
      title: "Pterodactyl Infrastructure",
      category: "SysAdmin / DevOps",
      description:
        "Production-oriented Pterodactyl panel and Wings infrastructure for managing multiple services.",
      tech: ["Pterodactyl", "Wings", "MySQL", "Redis", "Reverse Proxy", "Backups"],
      visual: "panel" as const,
    },
  ],
  projectsNote:
    "Selected personal and infrastructure projects. Details, access examples, and references are shared on request via Discord.",

  /** Experience — capability-based (no invented employers or dates) ------- */
  experience: [
    {
      id: "minecraft-ecosystem",
      icon: "pickaxe" as const,
      title: "Minecraft Server Ecosystem",
      summary:
        "Building and maintaining Java Edition servers on Paper, Purpur, Spigot, Fabric, and Forge — plugin stacks, permissions, world tuning, and performance work that keeps gameplay smooth under load.",
      tags: ["Paper / Purpur", "Fabric / Forge", "Plugin stacks", "TPS tuning"],
    },
    {
      id: "hosting-infra",
      icon: "server" as const,
      title: "Hosting & Infrastructure",
      summary:
        "Deploying Pterodactyl panels with Wings nodes on Linux VPS machines — allocations, eggs, reverse proxies, SSL, Cloudflare DNS, firewalls, backups, and monitoring for multi-service setups.",
      tags: ["Pterodactyl + Wings", "Nginx / SSL", "Cloudflare", "Backups"],
    },
    {
      id: "discord-dev",
      icon: "bot" as const,
      title: "Discord Development",
      summary:
        "Designing Discord communities end to end and writing custom bots for moderation, tickets, verification, welcome flows, and API integrations that connect services to the community.",
      tags: ["discord.js", "pycord", "Tickets", "Automation"],
    },
    {
      id: "web-automation",
      icon: "code" as const,
      title: "Web & Automation",
      summary:
        "Shipping modern responsive websites, dashboards, and stores for servers and hosting brands, plus scripting and AI-assisted workflows that remove repetitive admin work.",
      tags: ["React / Next.js", "TypeScript", "Python", "AI-assisted"],
    },
  ],

  /** Interactive terminal ------------------------------------------------- */
  terminal: {
    title: "Behind the Terminal",
    description:
      "A little interactive shell. Type a command — it runs right here in your browser, purely for fun. Nothing touches your device.",
    prompt: "arixo@infra: ~",
    bootSequence: ["whoami", "skills", "status", "minecraft"],
    commands: {
      whoami: "Arixo — Minecraft Developer & SysAdmin",
      skills: "Minecraft • Linux • Pterodactyl • Python • Discord • Web",
      status: "Available for paid work",
      minecraft: "ArshuPremium",
      discord: "adminx.in — message me for paid work",
      services: [
        "minecraft-server   — Minecraft server development",
        "pterodactyl      — Pterodactyl panel + Wings setup",
        "discord-server   — Discord community development",
        "discord-bot      — Custom Discord bots",
        "web              — Websites & dashboards",
        "linux-vps        — Linux / VPS administration",
      ].join("\n"),
      projects: ["Nova Cloud", "Epyc Node", "Custom Discord Bots", "Pterodactyl Infrastructure"].join(
        "\n"
      ),
      contact: "Discord: adminx.in — the fastest way to reach me",
      infra: "Linux • Pterodactyl • Wings • Nginx • Cloudflare • MySQL • Redis",
      stack: "Next.js • TypeScript • Tailwind • Three.js (skinview3d) • Node.js",
      hireme: "All services are paid. Ping adminx.in on Discord with your requirements.",
      sudo: "Permission denied. This shell has exactly one admin — and you're not it. :)",
      ls: "about/  skills/  services/  projects/  experience/  terminal/  infrastructure/  contact/",
    } as Record<string, string>,
    helpLines: [
      "Available commands:",
      "  whoami     — who is behind this site",
      "  skills     — core skill stack",
      "  status     — current availability",
      "  minecraft  — Minecraft IGN",
      "  discord    — Discord contact",
      "  services   — what can be commissioned",
      "  projects   — selected work",
      "  infra      — infrastructure toolkit",
      "  stack      — what this website is built with",
      "  contact    — how to reach me",
      "  ls         — list site sections",
      "  clear      — clear the screen",
    ],
  },

  /** Infrastructure / Pterodactyl demo section ---------------------------- */
  infrastructure: {
    title: "Infrastructure & Pterodactyl",
    description:
      "The stack behind every game-hosting project: a hardened panel, connected Wings daemons, clean allocations, and servers that stay manageable at scale.",
    demoNotice:
      "Concept visualization — a stylized look at a Pterodactyl-based stack, not live telemetry. If a live API is connected later, real data will be labeled as live.",
    statusCards: [
      { label: "Panel", value: "Operational", icon: "panel" as const },
      { label: "Wings", value: "Operational", icon: "daemon" as const },
      { label: "Node", value: "Connected", icon: "node" as const },
      { label: "Servers", value: "Managed", icon: "blocks" as const },
    ],
    demoServers: [
      { name: "survival-01", egg: "Paper", status: "running" as const },
      { name: "modded-01", egg: "Forge", status: "running" as const },
      { name: "proxy-01", egg: "Velocity", status: "idle" as const },
      { name: "bot-main", egg: "Node.js", status: "running" as const },
    ],
    logLines: [
      "[wings] syncing server configuration … ok",
      "[nginx] 200 GET /api/client/servers",
      "[panel] scheduled task: backups queued",
      "[ufw] allow 25565/tcp · allow 443/tcp",
      "[certbot] certificate valid · auto-renew armed",
      "[wings] allocation 0.0.0.0:25566 registered",
      "[panel] audit: node-01 heartbeat received",
      "[dns] cloudflare proxied A record updated",
    ],
  },

  /** Discord + status section --------------------------------------------- */
  connect: {
    discordStatus: "Available for Work",
    discordNote:
      "Public handle only — no private profile data is fetched or displayed.",
    statusRows: [
      { label: "Minecraft", value: "ArshuPremium", source: "live" as const },
      { label: "Discord", value: "adminx.in", source: "profile" as const },
      { label: "Availability", value: "Available for Paid Work", source: "profile" as const },
      {
        label: "Infrastructure",
        value: "Pterodactyl · Wings · Linux",
        source: "profile" as const,
      },
    ],
    statusNote:
      "Profile information. The Minecraft row is resolved live through Mojang's public API; everything else is configured profile data — not fake live monitoring.",
  },

  /** Contact ---------------------------------------------------------------- */
  contact: {
    title: "Let's Build Something",
    description:
      "Need a Minecraft server, Discord bot, Pterodactyl setup, VPS configuration, or a custom website? Contact me for paid work.",
    primaryCta: "Contact on Discord",
  },

  /** Footer ------------------------------------------------------------------ */
  footer: {
    brand: "ArshuPremium",
    tagline: "Minecraft Developer • SysAdmin • Developer",
    links: [
      { label: "Home", href: "#home" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
      { label: "Discord", href: "#contact", external: false },
    ],
    copyright: "© 2026 Arixo. All rights reserved.",
    builtWith: "Built with code, caffeine, and too many terminal sessions.",
  },
} as const;

export type PortfolioConfig = typeof portfolioConfig;

/** Absolute site URL — override with NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arixo-portfolio.vercel.app";
