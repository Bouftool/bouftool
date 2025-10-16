export { BuildCandidate } from "./BuildCandidate";
export {
  EquipmentConflictConstraint,
  MaxItemsPerRarityConstraint,
  MaxStatConstraint,
  MinStatConstraint,
  NoDuplicateRingConstraint,
  RequiredItemConstraint,
} from "./constraints";
export { Constraint } from "./constraints/Constraint";
export { ConstraintManager } from "./constraints/ConstraintManager";
export { LocalSearchOptimizer } from "./LocalSearchOptimizer";

export type {
  TBuildCandidateEquipment,
  TBuildOptimizationConfig,
  TBuildOptimizationResult,
  TConstraintEvaluationResult,
  TOptimizationProgress,
  TOptimizationProgressCallback,
} from "./types";
export { DEFAULT_ALGORITHM_PARAMS, EnumConstraintType } from "./types";

export { ItemScorer, type TItemScorerConfig } from "./utils/ItemScorer";
