import { evaluateLoadout } from "./evaluator";
import type {
  TEquipmentCatalog,
  TEquipmentLoadout,
  TEquipmentRuleContext,
  TEquipmentSlot,
  TEvaluatedBuild,
} from "./types";

export const enumerateLoadouts = (
  catalog: TEquipmentCatalog,
  context: TEquipmentRuleContext,
  slots: readonly TEquipmentSlot[],
): TEvaluatedBuild[] => {
  const results: TEvaluatedBuild[] = [];
  const visit = (slotIndex: number, loadout: TEquipmentLoadout) => {
    if (slotIndex === slots.length) {
      const evaluated = evaluateLoadout(catalog, loadout, context);
      if (evaluated.legal) {
        results.push(evaluated);
      }
      return;
    }
    visit(slotIndex + 1, loadout);
    const slot = slots[slotIndex];
    for (const item of catalog.items) {
      if (!item.optimizerCandidate || !item.positions.includes(slot)) {
        continue;
      }
      visit(slotIndex + 1, {
        schemaVersion: 1,
        placements: [
          ...loadout.placements,
          {
            slot,
            definitionId: item.definitionId,
            copyId: `${item.definitionId}:0`,
            allocation: null,
            modifications: [],
          },
        ],
      });
    }
  };
  visit(0, { schemaVersion: 1, placements: [] });
  return results;
};
