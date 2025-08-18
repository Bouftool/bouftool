import type { TWakfuItem } from "src/wakfu/types/items";
import type { WakfuLang } from "src/wakfu/types/utils";
import { WakfuParser } from "..";
import { WakfuParserItemEffectsCustomParser } from "./customParser";
import { WakfuParserItemEffectsMergeEffectsRules } from "./mergeEffectsRules";
import { WakfuParserItemEffectsParamsResolvers } from "./paramsResolvers";
import type { WakfuParserItemEffectsDataMaps, WakfuParserItemEffectsEntry } from "./types";

export class WakfuParserItemEffects {
  private item: TWakfuItem;
  private lang: WakfuLang;
  private dataMaps?: WakfuParserItemEffectsDataMaps;

  constructor(item: TWakfuItem, lang: WakfuLang, dataMaps?: WakfuParserItemEffectsDataMaps) {
    this.item = item;
    this.dataMaps = dataMaps;
    this.lang = lang;
  }

  private getEntries(): WakfuParserItemEffectsEntry[] {
    const effects: WakfuParserItemEffectsEntry[] = [];
    for (const equipEffect of this.item.equipEffects) {
      const mergeEffectRule = WakfuParserItemEffectsMergeEffectsRules.find((rule) =>
        rule.actionIds.includes(equipEffect.actionId),
      );
      if (
        mergeEffectRule &&
        this.item.equipEffects.filter((effect) => mergeEffectRule.actionIds.includes(effect.actionId)).length > 1
      ) {
        const mergedEffect = effects.find((entry) => entry.merge === mergeEffectRule.rule);
        if (mergedEffect && mergeEffectRule.isMergeable(mergedEffect.params, equipEffect)) {
          mergedEffect.params = mergeEffectRule.updateParams(mergedEffect.params, equipEffect);
        } else {
          effects.push({
            merge: mergeEffectRule.rule,
            actionId: equipEffect.actionId,
            template: mergeEffectRule.description[this.lang],
            params: mergeEffectRule.createParams(equipEffect),
          });
        }
      } else {
        const template = equipEffect.description || this.dataMaps?.actions?.get(equipEffect.actionId);
        if (template) {
          effects.push({
            actionId: equipEffect.actionId,
            template: template?.[this.lang] ?? "Undefined",
            params: equipEffect.params,
            resolveParams: WakfuParserItemEffectsParamsResolvers.get(equipEffect.actionId)?.(this.lang, this.dataMaps),
          });
        }
      }
    }
    return effects;
  }

  public parse(): string[] {
    const entries = this.getEntries();
    return entries.map((entry) => {
      const customParser = WakfuParserItemEffectsCustomParser.get(entry.actionId);
      if (customParser) {
        return customParser(this.lang, this.dataMaps)(entry, this.item.level);
      } else {
        const wakfuParser = new WakfuParser({ resolveParams: entry.resolveParams });
        return wakfuParser.parse(entry.template, entry.params, this.item.level);
      }
    });
  }
}
