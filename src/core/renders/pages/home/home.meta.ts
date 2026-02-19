import { Flame, Droplets, ShieldAlert } from "lucide-react";

export const PRESET_META: Record<
  number,
  { icon: any; color: string; bg: string }
> = {
  1: { icon: Flame, color: "text-red-500", bg: "bg-red-500/10" },
  2: { icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
  3: { icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-500/10" },
};
