import type { TWakfuDescription } from "src/wakfu/types/description";
import type { TWakfuEffect } from "src/wakfu/types/effect";
import type { WakfuLang } from "src/wakfu/types/utils";
import type { WakfuParserOptions } from "../index";

export type WakfuParserItemEffectsMergeEffectsRule = {
  rule: string;
  actionIds: number[];
  description: Record<string, string>;
  createParams: (originEffect: TWakfuEffect) => number[];
  updateParams: (params: number[], originEffect: TWakfuEffect) => number[];
};

export type WakfuParserItemEffectsEntry = {
  merge?: string;
  actionId: number;
  parentTemplate?: string;
  template: string;
  params: number[];
  resolveParams?: WakfuParserOptions["resolveParams"];
};

export type WakfuParserItemEffectsDataMaps = {
  actions?: Map<number, TWakfuDescription>;
  recipeCategories?: Map<number, TWakfuDescription>;
  states?: Map<number, TWakfuDescription>;
};

export type WakfuParserItemEffectsCustomResolverFactory = (
  lang: WakfuLang,
  dataMaps?: WakfuParserItemEffectsDataMaps,
) => (entry: WakfuParserItemEffectsEntry, itemLevel: number) => string;

export type WakfuParserItemEffectsParamResolverFactory = (
  lang: WakfuLang,
  dataMaps?: WakfuParserItemEffectsDataMaps,
) => WakfuParserOptions["resolveParams"];
