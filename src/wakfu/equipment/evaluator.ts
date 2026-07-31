import { addRational, type TRational, truncateRational } from "./integer";
import { evaluateLegality } from "./legality";
import type { TEquipmentCatalog, TEquipmentLoadout, TEquipmentRuleContext, TEvaluatedBuild } from "./types";

export const evaluateLoadout = (
  catalog: TEquipmentCatalog,
  loadout: TEquipmentLoadout,
  context: TEquipmentRuleContext,
): TEvaluatedBuild => {
  const totals = new Map<string, TRational>();
  for (const [stat, value] of Object.entries(context.fixedStats)) {
    totals.set(stat, { numerator: value, denominator: 1n });
  }
  const diagnostics: TEvaluatedBuild["diagnostics"] = [];
  const items = new Map(catalog.items.map((item) => [item.definitionId, item]));
  for (const placement of loadout.placements) {
    const item = items.get(placement.definitionId);
    if (!item) {
      continue;
    }
    for (const effect of item.effects) {
      if (effect.kind === "marker") {
        continue;
      }
      if (effect.kind === "unsupported") {
        diagnostics.push({ id: `unsupported-effect:${effect.signature}`, kind: "unsupported-effect" });
        continue;
      }
      let contribution: TRational;
      if (effect.kind === "missingHealth") {
        if (context.missingHealthPercent === null) {
          diagnostics.push({ id: `missing-health-context:${effect.stat}`, kind: "missing-health-context" });
          continue;
        }
        contribution = {
          numerator: effect.numeratorPerPercent * BigInt(context.missingHealthPercent),
          denominator: effect.denominator,
        };
      } else if (effect.kind === "add") {
        contribution = { numerator: effect.value, denominator: 1n };
      } else {
        contribution = effect.value;
      }
      totals.set(effect.stat, addRational(totals.get(effect.stat) ?? { numerator: 0n, denominator: 1n }, contribution));
    }
  }
  const stats: TEvaluatedBuild["stats"] = {};
  for (const [stat, total] of totals) {
    stats[stat] = truncateRational(total);
  }
  const violations = evaluateLegality(catalog, loadout, context);
  return {
    loadout,
    legal: violations.length === 0,
    violations,
    stats,
    diagnostics,
    proofEligible: catalog.eligibilityCoverage === "complete" && diagnostics.length === 0,
  };
};
