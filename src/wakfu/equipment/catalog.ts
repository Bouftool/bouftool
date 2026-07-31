import type { TEquipmentCatalog, TEquipmentItemDefinition, TEquipmentRuleEffect } from "./types";

const freezeEffect = (effect: TEquipmentRuleEffect): TEquipmentRuleEffect => {
  if (effect.kind === "addRational") {
    return Object.freeze({ ...effect, value: Object.freeze({ ...effect.value }) });
  }
  return Object.freeze({ ...effect });
};

const freezeItem = (item: TEquipmentItemDefinition): TEquipmentItemDefinition =>
  Object.freeze({
    ...item,
    positions: Object.freeze([...item.positions]),
    disabledPositions: Object.freeze([...item.disabledPositions]),
    allowedBreedIds: Object.freeze([...item.allowedBreedIds]),
    requiredEligibilityFlags:
      item.requiredEligibilityFlags === undefined ? undefined : Object.freeze([...item.requiredEligibilityFlags]),
    effects: Object.freeze(item.effects.map(freezeEffect)),
  });

export const createEquipmentCatalog = (
  eligibilityCoverage: TEquipmentCatalog["eligibilityCoverage"],
  items: readonly TEquipmentItemDefinition[],
): TEquipmentCatalog => Object.freeze({ eligibilityCoverage, items: Object.freeze(items.map(freezeItem)) });
