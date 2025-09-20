import { Stack, Typography } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";
import { AbilitiesDefinitions } from "src/wakfu/abilities/abilities";
import type { EnumAbilities } from "src/wakfu/abilities/types";
import { getWakfuStatEffectLabel } from "src/wakfu/stats/i18n/effects";
import { EnumWakfuLang } from "src/wakfu/utils/types";
import { useBuildDetailsContext } from "../../context";
import { AbilitiesDisplay } from "../constants";

export type TAbilitiesCategoryTooltipProps = {
  ability: EnumAbilities;
};

export const AbilitiesCategoryTooltip = ({ ability }: TAbilitiesCategoryTooltipProps) => {
  const build = useBuildDetailsContext();
  const level = build.abilities[ability] ?? 0;
  const maxLevel = AbilitiesDefinitions[ability].maxLevel;

  return (
    <Stack sx={{ minWidth: 200, maxWidth: 300 }}>
      <StackRow sx={{ justifyContent: "space-between", pb: 0.5 }}>
        <Typography variant="subtitle2">{AbilitiesDisplay[ability].label}</Typography>
        <Typography variant="caption">
          Niv. {build.abilities[ability] ?? 0}
          {maxLevel > 0 && `/${maxLevel}`}
        </Typography>
      </StackRow>
      {AbilitiesDisplay[ability].description && (
        <Typography variant="caption" sx={{ pb: 1 }}>
          {AbilitiesDisplay[ability].description}
        </Typography>
      )}
      <Typography variant="caption" sx={{ fontWeight: 450, textDecoration: "underline" }}>
        Niveau actuel
      </Typography>
      {AbilitiesDefinitions[ability].effects.map((effect) => (
        <Typography key={effect.stat} variant="caption">
          {getWakfuStatEffectLabel(EnumWakfuLang.French, effect.stat, effect.scaling * (build.abilities[ability] ?? 0))}
        </Typography>
      ))}
      {(level < maxLevel || maxLevel === 0) && (
        <>
          <Typography variant="caption" sx={{ fontWeight: 450, textDecoration: "underline" }}>
            Niveau suivant
          </Typography>
          {AbilitiesDefinitions[ability].effects.map((effect) => (
            <Typography key={effect.stat} variant="caption">
              {getWakfuStatEffectLabel(
                EnumWakfuLang.French,
                effect.stat,
                effect.scaling * ((build.abilities[ability] ?? 0) + 1),
              )}
            </Typography>
          ))}
        </>
      )}
    </Stack>
  );
};
