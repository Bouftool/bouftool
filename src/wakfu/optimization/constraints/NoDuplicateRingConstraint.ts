import type { WakfuBuild } from "../../builds/build";
import { EnumWakfuEquipmentPosition } from "../../itemTypes/types";
import type { TBuildCandidateEquipment, TConstraintEvaluationResult } from "../types";
import { EnumConstraintType } from "../types";
import { Constraint } from "./Constraint";

export class NoDuplicateRingConstraint extends Constraint {
  private readonly penalty: number;

  constructor(type: EnumConstraintType = EnumConstraintType.Blocking, penalty: number = 10000) {
    super(type, "No duplicate rings", "Rings equipped on left and right hands must be different");
    this.penalty = penalty;
  }

  public evaluate(_build: WakfuBuild, equipment: TBuildCandidateEquipment): TConstraintEvaluationResult {
    const rightHandItem = equipment[EnumWakfuEquipmentPosition.RightHand];
    const leftHandItem = equipment[EnumWakfuEquipmentPosition.LeftHand];

    if (!rightHandItem || !leftHandItem) {
      return {
        satisfied: true,
        message: "At least one ring slot is empty",
        penalty: 0,
      };
    }

    const sameItem = rightHandItem.getId() === leftHandItem.getId();

    return {
      satisfied: !sameItem,
      message: sameItem
        ? `Ring ${rightHandItem.getId()} equipped twice (right and left hand)`
        : "Equipped rings are different",
      penalty: sameItem ? this.penalty : 0,
    };
  }
}
