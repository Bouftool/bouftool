import { Typography, type TypographyProps } from "@mui/material";
import { forwardRef } from "react";
import { StackRow } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { getWakfuStatLabel } from "src/wakfu/stats/i18n/label";
import type { EnumWakfuStat } from "src/wakfu/stats/types";
import { EnumWakfuLang } from "src/wakfu/utils/types";

export type TBuildStatsProps = {
  stats: EnumWakfuStat;
  value: string;
  label?: string;
  hideLabel?: boolean;
  statsColor?: string;
  slotProps?: {
    typoValue?: Partial<TypographyProps>;
  };
};

export const BuildStats = forwardRef<HTMLDivElement, TBuildStatsProps>(
  ({ stats, value, label, hideLabel, statsColor, slotProps, ...props }, ref) => {
    return (
      <StackRow {...props} sx={{ justifyContent: "space-between", "&&": { gap: 0.5 } }} ref={ref}>
        <StackRow sx={{ "&&": { gap: 0.5 } }}>
          <StatsIcon height={20}>{stats}</StatsIcon>
          {!hideLabel && (
            <Typography variant="caption">{label || getWakfuStatLabel(stats, EnumWakfuLang.French)}</Typography>
          )}
        </StackRow>
        <Typography variant="caption" {...slotProps?.typoValue} sx={{ color: statsColor }}>
          {value}
        </Typography>
      </StackRow>
    );
  },
);
