import { ToggleButton, ToggleButtonGroup, toggleButtonClasses } from "@mui/material";

export type TSearchEquipmentsSortsOptionsMasteryElementCountProps = {
  value: number;
  onChange: (value: number) => void;
};

export const SearchEquipmentsSortsOptionsMasteryElementCount = ({
  value,
  onChange,
}: TSearchEquipmentsSortsOptionsMasteryElementCountProps) => {
  return (
    <ToggleButtonGroup
      variant="push"
      fullWidth
      sx={{ [`& .${toggleButtonClasses.root}`]: { justifyContent: "center !important" } }}
    >
      <ToggleButton value={1} onClick={() => onChange(1)} selected={value >= 1}>
        1
      </ToggleButton>
      <ToggleButton value={2} onClick={() => onChange(2)} selected={value >= 2}>
        2
      </ToggleButton>
      <ToggleButton value={3} onClick={() => onChange(3)} selected={value >= 3}>
        3
      </ToggleButton>
      <ToggleButton value={4} onClick={() => onChange(4)} selected={value >= 4}>
        4
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
