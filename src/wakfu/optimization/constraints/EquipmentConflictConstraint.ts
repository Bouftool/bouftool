import type { WakfuBuild } from "../../builds/build";
import type { TBuildCandidateEquipment, TConstraintEvaluationResult } from "../types";
import { EnumConstraintType } from "../types";
import { Constraint } from "./Constraint";

export class EquipmentConflictConstraint extends Constraint {
  private readonly penalty: number;

  constructor(type: EnumConstraintType = EnumConstraintType.Blocking, penalty: number = 10000) {
    super(
      type,
      "Equipment conflicts",
      "Checks that no equipment occupies a position disabled by another equipment",
    );
    this.penalty = penalty;
  }

  public evaluate(_build: WakfuBuild, equipment: TBuildCandidateEquipment): TConstraintEvaluationResult {
    const conflicts: string[] = [];

    for (const [position, item] of Object.entries(equipment)) {
      if (!item) {
        continue;
      }

      const disabledPositions = item.getItemType().getEquipmentDisabledPositions();

      for (const disabledPosition of disabledPositions) {
        const conflictingItem = equipment[disabledPosition];
        if (conflictingItem) {
          conflicts.push(
            `Item ${item.getId()} at ${position} disables ${disabledPosition}, but item ${conflictingItem.getId()} is equipped there`,
          );
        }
      }
    }

    const satisfied = conflicts.length === 0;

    return {
      satisfied,
      message: satisfied ? "No equipment conflicts detected" : `Equipment conflicts: ${conflicts.join("; ")}`,
      penalty: satisfied ? 0 : this.penalty * conflicts.length,
    };
  }
}
