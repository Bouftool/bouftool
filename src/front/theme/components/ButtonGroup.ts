import type { Components, Theme } from "@mui/material";

declare module "@mui/material/ButtonGroup" {
  interface ButtonGroupPropsVariantOverrides {
    push: true;
  }
}

export const themeButtonGroup = {
  variants: [
    {
      props: { variant: "push" },
      style: {
        boxShadow: "inset 0 0 4px black",
        border: "1px solid rgba(255, 255, 255, 0.12)",
      },
    },
  ],
} satisfies Components<Theme>["MuiButtonGroup"];
