import type { TWakfuEffect } from "src/wakfu/types/effect";

export const WakfuParserItemEffectsMergeEffectsRules = [
  {
    rule: "resistance",
    actionIds: [82, 83, 84, 85],
    description: {
      fr: "[#charac RES_IN_PERCENT] [#1] Résistance {[+2]?[#charac RES_FIRE_PERCENT]:}{[+3]?[#charac RES_WATER_PERCENT]:}{[+4]?[#charac RES_EARTH_PERCENT]:}{[+5]?[#charac RES_AIR_PERCENT]:}",
      en: "[#charac RES_IN_PERCENT] [#1] Resistance {[+2]?[#charac RES_FIRE_PERCENT]:}{[+3]?[#charac RES_WATER_PERCENT]:}{[+4]?[#charac RES_EARTH_PERCENT]:}{[+5]?[#charac RES_AIR_PERCENT]:}",
      es: "[#charac RES_IN_PERCENT] [#1] Resistencia {[+2]?[#charac RES_FIRE_PERCENT]:}{[+3]?[#charac RES_WATER_PERCENT]:}{[+4]?[#charac RES_EARTH_PERCENT]:}{[+5]?[#charac RES_AIR_PERCENT]:}",
      pt: "[#charac RES_IN_PERCENT] [#1] Resistência {[+2]?[#charac RES_FIRE_PERCENT]:}{[+3]?[#charac RES_WATER_PERCENT]:}{[+4]?[#charac RES_EARTH_PERCENT]:}{[+5]?[#charac RES_AIR_PERCENT]:}",
    },
    actionsToParams: new Map<number, number>([
      [82, 2],
      [83, 4],
      [84, 6],
      [85, 8],
    ]),
    isMergeable(params: number[], originEffect: TWakfuEffect) {
      return params[0] === originEffect.params[0] && params[1] === originEffect.params[1];
    },
    createParams(originEffect: TWakfuEffect) {
      return this.updateParams([originEffect.params[0], originEffect.params[1], 0, 0, 0, 0, 0, 0, 0, 0], originEffect);
    },
    updateParams(params: number[], originEffect: TWakfuEffect) {
      const paramsSlots = this.actionsToParams.get(originEffect.actionId);
      if (paramsSlots !== undefined) {
        const copyParams = [...params];
        copyParams[paramsSlots] = 1;
        return copyParams;
      }
      return params;
    },
  },
  {
    rule: "damage",
    actionIds: [122, 123, 124, 125],
    description: {
      fr: "[#charac DMG_IN_PERCENT] [#1] Maîtrise {[+2]?[#charac DMG_FIRE_PERCENT]:}{[+3]?[#charac DMG_WATER_PERCENT]:}{[+4]?[#charac DMG_EARTH_PERCENT]:}{[+5]?[#charac DMG_AIR_PERCENT]:}",
      en: "[#charac DMG_IN_PERCENT] [#1] Mastery {[+2]?[#charac DMG_FIRE_PERCENT]:}{[+3]?[#charac DMG_WATER_PERCENT]:}{[+4]?[#charac DMG_EARTH_PERCENT]:}{[+5]?[#charac DMG_AIR_PERCENT]:}",
      es: "[#charac DMG_IN_PERCENT] [#1] Dominio {[+2]?[#charac DMG_FIRE_PERCENT]:}{[+3]?[#charac DMG_WATER_PERCENT]:}{[+4]?[#charac DMG_EARTH_PERCENT]:}{[+5]?[#charac DMG_AIR_PERCENT]:}",
      pt: "[#charac DMG_IN_PERCENT] [#1] Domínio {[+2]?[#charac DMG_FIRE_PERCENT]:}{[+3]?[#charac DMG_WATER_PERCENT]:}{[+4]?[#charac DMG_EARTH_PERCENT]:}{[+5]?[#charac DMG_AIR_PERCENT]:}",
    },
    actionsToParams: new Map<number, number>([
      [122, 2],
      [123, 6],
      [124, 4],
      [125, 8],
    ]),
    isMergeable(params: number[], originEffect: TWakfuEffect) {
      return params[0] === originEffect.params[0] && params[1] === originEffect.params[1];
    },
    createParams(originEffect: TWakfuEffect) {
      return this.updateParams([originEffect.params[0], originEffect.params[1], 0, 0, 0, 0, 0, 0, 0, 0], originEffect);
    },
    updateParams(params: number[], originEffect: TWakfuEffect) {
      const paramsSlots = this.actionsToParams.get(originEffect.actionId);
      if (paramsSlots !== undefined) {
        const copyParams = [...params];
        copyParams[paramsSlots] = 1;
        return copyParams;
      }
      return params;
    },
  },
];
