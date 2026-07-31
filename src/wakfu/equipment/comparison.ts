import { evaluateLoadout } from "./evaluator";
import type {
  TEquipmentCatalog,
  TEquipmentLoadout,
  TEquipmentRuleContext,
  TEquipmentSlot,
  TEvaluatedBuild,
  TItemPlacement,
} from "./types";

export type TStatDelta = { stat: string; value: bigint };
export type TPlacementDelta = { slot: TEquipmentSlot; before: TItemPlacement | null; after: TItemPlacement | null };

export type TEvaluatedBuildComparison = {
  stats: TStatDelta[];
  placements: TPlacementDelta[];
};

const placementsBySlot = (loadout: TEquipmentLoadout) =>
  new Map<TEquipmentSlot, TItemPlacement>(loadout.placements.map((placement) => [placement.slot, placement]));

export const compareEvaluatedBuilds = (before: TEvaluatedBuild, after: TEvaluatedBuild): TEvaluatedBuildComparison => {
  const stats = new Set([...Object.keys(before.stats), ...Object.keys(after.stats)]);
  const statDeltas: TStatDelta[] = [];
  for (const stat of [...stats].sort()) {
    const value = (after.stats[stat] ?? 0n) - (before.stats[stat] ?? 0n);
    if (value !== 0n) {
      statDeltas.push({ stat, value });
    }
  }
  const beforePlacements = placementsBySlot(before.loadout);
  const afterPlacements = placementsBySlot(after.loadout);
  const slots = new Set([...beforePlacements.keys(), ...afterPlacements.keys()]);
  const placementDeltas: TPlacementDelta[] = [];
  for (const slot of [...slots].sort()) {
    const previous = beforePlacements.get(slot) ?? null;
    const next = afterPlacements.get(slot) ?? null;
    if (previous?.definitionId !== next?.definitionId || previous?.copyId !== next?.copyId) {
      placementDeltas.push({ slot, before: previous, after: next });
    }
  }
  return { stats: statDeltas, placements: placementDeltas };
};

export const evaluateHypotheticalReplacement = (
  catalog: TEquipmentCatalog,
  origin: TEquipmentLoadout,
  replacement: TItemPlacement,
  context: TEquipmentRuleContext,
) => {
  const placements = origin.placements.filter((placement) => placement.slot !== replacement.slot);
  return evaluateLoadout(catalog, { schemaVersion: 1, placements: [...placements, replacement] }, context);
};
