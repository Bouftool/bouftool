import type { WakfuBuild } from "../../builds/build";
import type { EnumWakfuRarity } from "../../items/rarity";
import type { TBuildCandidateEquipment, TConstraintEvaluationResult } from "../types";
import { EnumConstraintType } from "../types";
import { Constraint } from "./Constraint";

export class MaxItemsPerRarityConstraint extends Constraint {
  private readonly rarity: EnumWakfuRarity;
  private readonly maxCount: number;
  private readonly penaltyPerExcess: number;

  constructor(
    rarity: EnumWakfuRarity,
    maxCount: number,
    type: EnumConstraintType = EnumConstraintType.Blocking,
    penaltyPerExcess: number = 1000,
  ) {
    super(type, `Max items rarity ${rarity}`, `The number of items with rarity ${rarity} must not exceed ${maxCount}`);
    this.rarity = rarity;
    this.maxCount = maxCount;
    this.penaltyPerExcess = penaltyPerExcess;
  }

  public evaluate(_build: WakfuBuild, equipment: TBuildCandidateEquipment): TConstraintEvaluationResult {
    let count = 0;
    for (const item of Object.values(equipment)) {
      if (item && item.getRarity() === this.rarity) {
        count++;
      }
    }

    const satisfied = count <= this.maxCount;
    const excess = Math.max(0, count - this.maxCount);

    return {
      satisfied,
      message: satisfied
        ? `${count} items with rarity ${this.rarity} (<= ${this.maxCount})`
        : `${count} items with rarity ${this.rarity} (> ${this.maxCount}, excess: ${excess})`,
      penalty: excess * this.penaltyPerExcess,
    };
  }

  public getRarity(): EnumWakfuRarity {
    return this.rarity;
  }

  public getMaxCount(): number {
    return this.maxCount;
  }
}
