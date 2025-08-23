import { Typography, type TypographyProps } from "@mui/material";
import { forwardRef } from "react";
import { StackRow } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { wakfuStatsLabels } from "src/front/constants/stats";
import type { WakfuStats } from "src/wakfu/types/action";

export type TBuildStatsProps = {
  stats: WakfuStats;
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
          {!hideLabel && <Typography variant="caption">{label || wakfuStatsLabels[stats].title.fr}</Typography>}
        </StackRow>
        <Typography variant="caption" {...slotProps?.typoValue} sx={{ color: statsColor }}>
          {value}
        </Typography>
      </StackRow>
    );
  },
);
