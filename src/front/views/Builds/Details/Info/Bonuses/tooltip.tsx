import { Stack, Typography } from "@mui/material";
import { StatsBonusesLabels } from "src/front/constants/bonuses";
import { getWakfuStatsEffectLabel } from "src/front/constants/stats";
import { type EnumStatsBonuses, StatsBonuses } from "src/wakfu/constants/statsBonuses";
import { isWakfuStats } from "src/wakfu/types/action";

export type TBonusTooltipProps = {
  bonus: EnumStatsBonuses;
};

export const BonusTooltip = ({ bonus }: TBonusTooltipProps) => {
  const stats = StatsBonuses[bonus];

  return (
    <Stack>
      <Typography variant="subtitle2">{StatsBonusesLabels[bonus].fr}</Typography>
      {Object.entries(stats).map(([key, value]) => {
        const stat = Number(key);
        if (isWakfuStats(stat)) {
          return (
            <Typography key={stat} variant="caption">
              {value}
              {getWakfuStatsEffectLabel(stat)}
            </Typography>
          );
        }
        return null;
      })}
    </Stack>
  );
};
