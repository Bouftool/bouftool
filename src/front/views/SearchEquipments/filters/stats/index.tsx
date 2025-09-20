import CloseIcon from "@mui/icons-material/Close";
import { Button, InputAdornment, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { SearchItemsFilterStatsOperator } from "src/electron/searchItems/types";
import { getWakfuStatLabel } from "src/wakfu/stats/i18n/label";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import { EnumWakfuLang } from "src/wakfu/utils/types";
import { SidePopover } from "../../../../components/Navigation/SidePopover";
import { StatsIcon } from "../../../../components/Wakfu/StatsIcon";
import type { TSearchItemsFiltersForm } from "../index";
import { StatsFiltersCardsOperator } from "./operator";

const Stats: Record<string, EnumWakfuStat[]> = {
  Main: [
    EnumWakfuStat.HealthPoint,
    EnumWakfuStat.WakfuPoint,
    EnumWakfuStat.ActionPoint,
    EnumWakfuStat.MovementPoint,
    EnumWakfuStat.Range,
    EnumWakfuStat.Control,
    EnumWakfuStat.Initiative,
    EnumWakfuStat.Dodge,
    EnumWakfuStat.Lock,
    EnumWakfuStat.Willpower,
  ],
  Mastery: [
    EnumWakfuStat.ElementalMastery,
    EnumWakfuStat.FireMastery,
    EnumWakfuStat.WaterMastery,
    EnumWakfuStat.EarthMastery,
    EnumWakfuStat.AirMastery,
    EnumWakfuStat.CriticalMastery,
    EnumWakfuStat.RearMastery,
    EnumWakfuStat.MeleeMastery,
    EnumWakfuStat.DistanceMastery,
    EnumWakfuStat.BerserkMastery,
    EnumWakfuStat.CriticalHit,
  ],
  Resistance: [
    EnumWakfuStat.ElementalResistance,
    EnumWakfuStat.FireResistance,
    EnumWakfuStat.WaterResistance,
    EnumWakfuStat.EarthResistance,
    EnumWakfuStat.AirResistance,
    EnumWakfuStat.CriticalResistance,
    EnumWakfuStat.RearResistance,
    EnumWakfuStat.ArmorGiven,
    EnumWakfuStat.ArmorReceived,
    EnumWakfuStat.HealingMastery,
    EnumWakfuStat.Block,
  ],
};

export type TStatsFilters = {
  value: TSearchItemsFiltersForm["stats"];
  onChange: (value: TSearchItemsFiltersForm["stats"]) => void;
};

export const StatsFilters = ({ value, onChange }: TStatsFilters) => {
  return (
    <SidePopover
      label={<StatsIcon>{EnumWakfuStat.HealthPoint}</StatsIcon>}
      slotProps={{ button: { sx: { height: "41px" } } }}
    >
      <Stack sx={{ flexDirection: "row" }}>
        {Object.keys(Stats).map((key) => (
          <ToggleButtonGroup key={key} orientation="vertical" variant="push">
            {Stats[key].map((stat) => (
              <ToggleButton
                key={stat}
                value={stat}
                selected={Boolean(value[stat])}
                onChange={() => {
                  if (value[stat]) {
                    onChange({ ...value, [stat]: undefined });
                  } else {
                    onChange({
                      ...value,
                      [stat]: {
                        value: 1,
                        operator: SearchItemsFilterStatsOperator.GreaterThanOrEqual,
                      },
                    });
                  }
                }}
              >
                <StatsIcon>{stat}</StatsIcon>
                <Typography variant="caption">{getWakfuStatLabel(stat, EnumWakfuLang.French)}</Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        ))}
      </Stack>
    </SidePopover>
  );
};

export const StatsFiltersCards = ({ value, onChange }: TStatsFilters) => {
  const children: ReactNode[] = [];
  for (const key in Stats) {
    for (const stat of Stats[key]) {
      if (value[stat]) {
        children.push(
          <TextField
            key={stat}
            size="small"
            value={value[stat].value}
            onChange={(e) => onChange({ ...value, [stat]: { ...value[stat], value: e.target.value } })}
            slotProps={{
              input: {
                startAdornment: (
                  <StatsFiltersCardsOperator
                    stat={stat}
                    operator={value[stat]?.operator}
                    onChange={(operator) => onChange({ ...value, [stat]: { ...value[stat], operator } })}
                  />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{ p: "2px", minWidth: 0 }}
                      onClick={() => onChange({ ...value, [stat]: undefined })}
                    >
                      <CloseIcon sx={{ fontSize: "16px" }} />
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ flex: "0 0 180px" }}
          />,
        );
      }
    }
  }
  if (children.length < 1) {
    return null;
  }
  return children;
};
