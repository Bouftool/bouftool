import type { WakfuBuild } from "../../builds/build";
import type { EnumWakfuEquipmentPosition } from "../../itemTypes/types";
import type { TBuildCandidateEquipment, TConstraintEvaluationResult } from "../types";
import { EnumConstraintType } from "../types";
import { Constraint } from "./Constraint";

export class RequiredItemConstraint extends Constraint {
  private readonly position: EnumWakfuEquipmentPosition;
  private readonly requiredItemId: number;
  private readonly penalty: number;

  constructor(
    position: EnumWakfuEquipmentPosition,
    requiredItemId: number,
    type: EnumConstraintType = EnumConstraintType.Blocking,
    penalty: number = 10000,
  ) {
    super(type, `Required item at ${position}`, `Item ${requiredItemId} must be equipped at position ${position}`);
    this.position = position;
    this.requiredItemId = requiredItemId;
    this.penalty = penalty;
  }

  public evaluate(_build: WakfuBuild, equipment: TBuildCandidateEquipment): TConstraintEvaluationResult {
    const item = equipment[this.position];
    const satisfied = item !== null && item !== undefined && item.getId() === this.requiredItemId;

    return {
      satisfied,
      message: satisfied
        ? `Item ${this.requiredItemId} equipped at ${this.position}`
        : `Item ${this.requiredItemId} not equipped at ${this.position}`,
      penalty: satisfied ? 0 : this.penalty,
    };
  }

  public getPosition(): EnumWakfuEquipmentPosition {
    return this.position;
  }

  public getRequiredItemId(): number {
    return this.requiredItemId;
  }
}
