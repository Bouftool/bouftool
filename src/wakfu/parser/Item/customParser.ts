import { TranslatedLabels } from "../constant";
import type { WakfuParserItemEffectsCustomResolverFactory } from "./types";

export const WakfuParserItemEffectsCustomParser = new Map<number, WakfuParserItemEffectsCustomResolverFactory>([
  [
    304,
    (lang, dataMaps) => (entry, itemLevel) => {
      const [stateId, , stateLevel, levelScaling] = entry.params;
      const state = dataMaps?.states?.get(stateId);
      if (state) {
        return `${state[lang]} (+${stateLevel + (levelScaling || 0) * itemLevel} ${TranslatedLabels.Level[lang]})`;
      }
      return "Undefined";
    },
  ],
]);
