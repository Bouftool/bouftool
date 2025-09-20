import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Typography } from "@mui/material";
import clsx from "clsx";
import type { ReactNode } from "react";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { getWakfuStatEffectLabel } from "src/wakfu/stats/i18n/effects";
import type { EnumWakfuStat } from "src/wakfu/stats/types";
import { EnumWakfuLang } from "src/wakfu/utils/types";
import { getStatsColor } from "../../Builds/Details/Stats/logics";
import { compareItemStatsClasses } from "./styles";

export type TComparedStats = { stat: EnumWakfuStat; value: number }[];

export type TModalCompareItemCardRowProps = {
  type: "gain" | "loss";
  stats: TComparedStats;
  length: number;
};

export const ModalCompareItemCardRow = ({ type, stats, length }: TModalCompareItemCardRowProps) => {
  const children: ReactNode[] = [];
  for (let i = 0; i < length; i++) {
    if (stats[i] === undefined) {
      children.push(<div className={clsx(compareItemStatsClasses.row, compareItemStatsClasses.placeholder)} />);
    } else {
      const { stat, value } = stats[i];
      children.push(
        <div key={stat} className={compareItemStatsClasses.row}>
          <StatsIcon width={18}>{stat}</StatsIcon>
          <Typography variant="caption" sx={{ color: getStatsColor(value) }}>
            {getWakfuStatEffectLabel(EnumWakfuLang.French, stat, value)}
          </Typography>
        </div>,
      );
    }
  }
  return (
    <div className={compareItemStatsClasses.column}>
      <div className={compareItemStatsClasses.row} style={{ justifyContent: "center" }}>
        {type === "gain" ? (
          <AddIcon sx={{ color: getStatsColor(1) }} />
        ) : (
          <RemoveIcon sx={{ color: getStatsColor(-1) }} />
        )}
      </div>
      {children}
    </div>
  );
};
