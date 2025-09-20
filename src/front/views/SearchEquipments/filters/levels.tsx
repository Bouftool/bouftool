import { Slider, Stack, Typography } from "@mui/material";
import type { TSearchItemsFilters } from "src/electron/searchItems/types";

export type TLevelsFilterProps = {
  value: TSearchItemsFilters["levels"];
  onChange: (value: TSearchItemsFilters["levels"]) => void;
};

export const LevelsFilter = ({ value, onChange }: TLevelsFilterProps) => {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, width: 300 }}>
      <Typography variant="subtitle2">Niv.</Typography>
      <Slider
        value={[value.min, value.max]}
        onChange={(_, newValue) => {
          onChange({
            min: newValue[0],
            max: newValue[1],
          });
        }}
        size="small"
        valueLabelDisplay="auto"
        min={0}
        max={245}
        marks={[0, 20, 50, 65, 80, 95, 110, 125, 140, 155, 170, 185, 200, 215, 230, 245].map((value) => ({
          value,
          label: null,
        }))}
        step={null}
      />
    </Stack>
  );
};
