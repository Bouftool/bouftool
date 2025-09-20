import type { HTMLProps } from "react";
import { WakfuStatIcons } from "src/wakfu/stats/icons";
import type { EnumWakfuStat } from "src/wakfu/stats/types";

export type TStatsIconProps = Omit<HTMLProps<HTMLImageElement>, "children" | "src" | "alt"> & {
  children: EnumWakfuStat;
};

export const StatsIcon = ({ children, ...props }: TStatsIconProps) => {
  const icon = WakfuStatIcons[children];
  if (icon === null) {
    return null;
  }
  return <img src={`wakfu/charac/${icon}.png`} alt={icon} {...props} />;
};
