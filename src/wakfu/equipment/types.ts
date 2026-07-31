import type { EnumWakfuBreed } from "../breed/types";
import type { EnumWakfuRarity } from "../items/rarity";
import type { EnumWakfuEquipmentPosition } from "../itemTypes/types";
import type { OptimizerInt, TRational } from "./integer";

export type TEquipmentSlot = EnumWakfuEquipmentPosition;
export type TStatId = string;

export type TEquipmentRuleEffect =
  | { kind: "add"; stat: TStatId; value: OptimizerInt }
  | { kind: "addRational"; stat: TStatId; value: TRational }
  | { kind: "missingHealth"; stat: TStatId; numeratorPerPercent: OptimizerInt; denominator: OptimizerInt }
  | { kind: "marker"; stateId: number }
  | { kind: "unsupported"; signature: string; policy: "zero-diagnostic" };

export type TEquipmentItemDefinition = {
  definitionId: number;
  level: number;
  rarity: EnumWakfuRarity;
  positions: readonly TEquipmentSlot[];
  disabledPositions: readonly TEquipmentSlot[];
  allowedBreedIds: readonly EnumWakfuBreed[];
  requiredEligibilityFlags?: readonly string[];
  effects: readonly TEquipmentRuleEffect[];
  optimizerCandidate: boolean;
};

export type TEquipmentCatalog = {
  eligibilityCoverage: "complete" | "incomplete";
  items: readonly TEquipmentItemDefinition[];
};

export type TEquipmentRuleContext = {
  characterLevel: number;
  characterBreed: EnumWakfuBreed;
  enabledSlots: readonly TEquipmentSlot[];
  eligibilityFlags: readonly string[];
  missingHealthPercent: number | null;
  fixedStats: Record<TStatId, OptimizerInt>;
};

export type TItemPlacement = {
  slot: TEquipmentSlot;
  definitionId: number;
  copyId: string;
  allocation: readonly TEquipmentSlot[] | null;
  modifications: readonly [];
};

export type TEquipmentLoadout = {
  schemaVersion: 1;
  placements: readonly TItemPlacement[];
};

export type TLegalityViolation = {
  id: string;
  kind:
    | "missing-definition"
    | "slot-capacity"
    | "invalid-position"
    | "disabled-position"
    | "duplicate-copy"
    | "duplicate-definition"
    | "rarity-cap"
    | "item-level"
    | "breed"
    | "eligibility-flag";
};

export type TEvaluationDiagnostic = {
  id: string;
  kind: "missing-health-context" | "unsupported-effect";
};

export type TEvaluatedBuild = {
  loadout: TEquipmentLoadout;
  legal: boolean;
  violations: TLegalityViolation[];
  stats: Record<TStatId, OptimizerInt>;
  diagnostics: TEvaluationDiagnostic[];
  proofEligible: boolean;
};
