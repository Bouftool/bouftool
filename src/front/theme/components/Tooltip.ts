import type { Components, Theme } from "@mui/material";

export const themeTooltip = {
  styleOverrides: {
    tooltip: ({ theme }) => ({
      backgroundColor: theme.palette.surface[200],
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.border.light}`,
    }),
    arrow: ({ theme }) => ({
      color: theme.palette.surface[200],
    }),
  },
} satisfies Components<Theme>["MuiTooltip"];
