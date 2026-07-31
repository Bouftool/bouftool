import { EnumWakfuRarity } from "../items/rarity";
import type { TEquipmentCatalog, TEquipmentLoadout, TEquipmentRuleContext, TLegalityViolation } from "./types";

export const evaluateLegality = (
  catalog: TEquipmentCatalog,
  loadout: TEquipmentLoadout,
  context: TEquipmentRuleContext,
): TLegalityViolation[] => {
  const items = new Map(catalog.items.map((item) => [item.definitionId, item]));
  const violations: TLegalityViolation[] = [];
  const copyCounts = new Map<string, number>();
  const definitionCounts = new Map<number, number>();
  const slotCounts = new Map<string, number>();
  const rarityCounts = new Map<number, number>();

  for (const placement of loadout.placements) {
    copyCounts.set(placement.copyId, (copyCounts.get(placement.copyId) ?? 0) + 1);
    definitionCounts.set(placement.definitionId, (definitionCounts.get(placement.definitionId) ?? 0) + 1);
    slotCounts.set(placement.slot, (slotCounts.get(placement.slot) ?? 0) + 1);
    const item = items.get(placement.definitionId);
    if (!item) {
      violations.push({ id: `missing-definition:${placement.definitionId}`, kind: "missing-definition" });
      continue;
    }
    rarityCounts.set(item.rarity, (rarityCounts.get(item.rarity) ?? 0) + 1);
    if (!item.positions.includes(placement.slot)) {
      violations.push({ id: `invalid-position:${placement.definitionId}:${placement.slot}`, kind: "invalid-position" });
    }
    if (item.level > context.characterLevel) {
      violations.push({ id: `item-level:${placement.definitionId}`, kind: "item-level" });
    }
    if (item.allowedBreedIds.length > 0 && !item.allowedBreedIds.includes(context.characterBreed)) {
      violations.push({ id: `breed:${placement.definitionId}`, kind: "breed" });
    }
    for (const flag of item.requiredEligibilityFlags ?? []) {
      if (!context.eligibilityFlags.includes(flag)) {
        violations.push({ id: `eligibility-flag:${placement.definitionId}:${flag}`, kind: "eligibility-flag" });
      }
    }
  }

  for (const [copyId, count] of copyCounts) {
    if (count > 1) {
      violations.push({ id: `duplicate-copy:${copyId}`, kind: "duplicate-copy" });
    }
  }
  for (const [definitionId, count] of definitionCounts) {
    if (count > 1) {
      violations.push({ id: `duplicate-definition:${definitionId}`, kind: "duplicate-definition" });
    }
  }
  for (const rarity of [EnumWakfuRarity.Relic, EnumWakfuRarity.Epic]) {
    if ((rarityCounts.get(rarity) ?? 0) > 1) {
      violations.push({ id: `rarity-cap:${rarity}`, kind: "rarity-cap" });
    }
  }
  for (const [slot, count] of slotCounts) {
    if (count > 1) {
      violations.push({ id: `slot-capacity:${slot}`, kind: "slot-capacity" });
    }
  }
  for (const placement of loadout.placements) {
    for (const other of loadout.placements) {
      const item = items.get(other.definitionId);
      if (item?.disabledPositions.includes(placement.slot)) {
        violations.push({ id: `disabled-position:${placement.slot}:${other.definitionId}`, kind: "disabled-position" });
      }
    }
  }
  return violations.sort((left, right) => left.id.localeCompare(right.id));
};

export const isStrictViolationSubset = (candidate: string[], origin: string[]): boolean => {
  if (candidate.length >= origin.length) {
    return false;
  }
  const originIds = new Set(origin);
  return candidate.every((id) => originIds.has(id));
};
