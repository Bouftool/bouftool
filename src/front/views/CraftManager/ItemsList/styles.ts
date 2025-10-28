import { Box, styled } from "@mui/material";

const SelectableRecipePrefix = "SelectableRecipe";

export const selectableRecipeClasses = {
  root: `${SelectableRecipePrefix}-root`,
};

export const SelectableRecipe = styled(Box, { shouldForwardProp: (prop) => prop !== "isSelected" })<{
  isSelected: boolean;
}>(({ theme, isSelected }) => ({
  [`&.${selectableRecipeClasses.root}`]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    border: "2px solid",
    borderColor: isSelected ? `${theme.palette.primary.main}` : `${theme.palette.divider}`,
    borderRadius: "8px",
    backgroundColor: isSelected ? `${theme.palette.surface[200]}` : `${theme.palette.surface[100]}`,
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      borderColor: "primary.light",
      bgcolor: "action.hover",
    },
  },
}));
