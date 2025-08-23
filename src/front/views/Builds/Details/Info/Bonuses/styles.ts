import { Button, buttonBaseClasses, styled } from "@mui/material";

const Prefix = "BonusButton";

export const bonusButtonClasses = {
  root: `${Prefix}-root`,
  selected: `Mui-selected`,
};

export const BonusButton = styled(Button)(({ theme }) => ({
  [`&.${buttonBaseClasses.root}`]: {
    aspectRation: "1",
    padding: theme.spacing(0.25),
    minWidth: 0,
    [`&.${bonusButtonClasses.selected}`]: {
      borderColor: "rgba(0, 255, 0, 0.24)",
    },
  },
}));
