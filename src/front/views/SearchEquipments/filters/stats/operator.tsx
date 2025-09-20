import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button, InputAdornment, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useRef, useState } from "react";
import { SearchItemsFilterStatsOperator } from "src/electron/searchItems/types";
import { Popover } from "src/front/components/Navigation/Popover";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import type { EnumWakfuStat } from "src/wakfu/stats/types";

const OperatorLabels = {
  [SearchItemsFilterStatsOperator.GreaterThanOrEqual]: "≥",
  [SearchItemsFilterStatsOperator.LessThanOrEqual]: "≤",
  [SearchItemsFilterStatsOperator.Equal]: "=",
};

export type TStatsFiltersCardsOperatorProps = {
  stat: EnumWakfuStat;
  operator: SearchItemsFilterStatsOperator;
  onChange: (operator: SearchItemsFilterStatsOperator) => void;
};

export const StatsFiltersCardsOperator = ({ stat, operator, onChange }: TStatsFiltersCardsOperatorProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <InputAdornment position="start">
      <StatsIcon style={{ paddingRight: "6px" }}>{stat}</StatsIcon>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 48,
          minWidth: 48,
          py: 0,
          px: 1,
          fontSize: "16px",
          lineHeight: 1,
        }}
        endIcon={<ArrowDropDownIcon sx={{ fontSize: "16px" }} />}
        onClick={() => setOpen((open) => !open)}
        ref={anchorRef}
      >
        {OperatorLabels[operator]}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setOpen(false)}
      >
        <ToggleButtonGroup variant="push" orientation="vertical" sx={{ width: 48 }}>
          {Object.values(SearchItemsFilterStatsOperator).map((optOperator) => (
            <ToggleButton
              key={optOperator}
              value={optOperator}
              selected={operator === optOperator}
              onChange={() => onChange(optOperator)}
              onClick={() => setOpen(false)}
              sx={{ justifyContent: "center !important" }}
            >
              {OperatorLabels[optOperator]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Popover>
    </InputAdornment>
  );
};
