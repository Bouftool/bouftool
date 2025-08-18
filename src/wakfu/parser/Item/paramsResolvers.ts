import type { WakfuParserItemEffectsParamResolverFactory } from "./types";

export const WakfuParserItemEffectsParamsResolvers = new Map<number, WakfuParserItemEffectsParamResolverFactory>([
  [
    2001,
    (lang, dataMaps) => (paramIndex, value) => {
      if (paramIndex === 2 && typeof value === "number") {
        const recipeCategory = dataMaps?.recipeCategories?.get(value);
        if (recipeCategory) {
          return recipeCategory[lang];
        }
      }
      return String(value);
    },
  ],
]);
