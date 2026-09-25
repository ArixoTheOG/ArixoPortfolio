import {
  Blocks,
  Bot,
  Code2,
  Globe,
  HardDrive,
  LayoutDashboard,
  MessagesSquare,
  Network,
  Pickaxe,
  Server,
  Terminal,
  type LucideIcon,
} from "lucide-react";

/** Single icon registry — config files reference icons by stable string id. */
const icons: Record<string, LucideIcon> = {
  pickaxe: Pickaxe,
  server: Server,
  panel: LayoutDashboard,
  code: Code2,
  discord: MessagesSquare,
  blocks: Blocks,
  bot: Bot,
  community: MessagesSquare,
  globe: Globe,
  terminal: Terminal,
  daemon: HardDrive,
  node: Network,
};

export function getIcon(name: string): LucideIcon {
  return icons[name] ?? Code2;
}
