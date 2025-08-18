import type { PaletteColor, PaletteOptions } from "@mui/material";
import { themePaletteBorder } from "./border";
import { themePaletteGrey } from "./grey";
import { themeWakfu } from "./wakfu";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    border: PaletteColor;
    wakfu: PaletteColor;
  }
  interface Palette {
    border: PaletteColor;
    wakfu: PaletteColor;
  }
}

export const lightThemePalette = {
  grey: themePaletteGrey,
  border: themePaletteBorder,
  wakfu: themeWakfu.light,
} satisfies PaletteOptions;

export const darkThemePalette = {
  grey: themePaletteGrey,
  border: themePaletteBorder,
  wakfu: themeWakfu.dark,
} satisfies PaletteOptions;
