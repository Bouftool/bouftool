import { Stack, Typography } from "@mui/material";
import { StatsBonusesLabels } from "src/front/constants/bonuses";
import { type EnumWakfuStatsBonuses, StatsBonuses } from "src/wakfu/builds/bonus";
import { getWakfuStatEffectLabel } from "src/wakfu/stats/i18n/effects";
import { isWakfuStat } from "src/wakfu/stats/types";
import { EnumWakfuLang } from "src/wakfu/utils/types";

export type TBonusTooltipProps = {
  bonus: EnumWakfuStatsBonuses;
};

export const BonusTooltip = ({ bonus }: TBonusTooltipProps) => {
  const stats = StatsBonuses[bonus];

  return (
    <Stack>
      <Typography variant="subtitle2">{StatsBonusesLabels[bonus].fr}</Typography>
      {Object.entries(stats.toObject()).map(([key, value]) => {
        if (isWakfuStat(key)) {
          return (
            <Typography key={key} variant="caption">
              {getWakfuStatEffectLabel(EnumWakfuLang.French, key, value)}
            </Typography>
          );
        }
        return null;
      })}
    </Stack>
  );
};
