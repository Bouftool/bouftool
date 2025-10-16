import type { WakfuBuild } from "../../builds/build";
import { WakfuStats } from "../../stats";
import type { EnumWakfuStat } from "../../stats/types";
import type { TBuildCandidateEquipment, TConstraintEvaluationResult } from "../types";
import { EnumConstraintType } from "../types";
import { Constraint } from "./Constraint";

export class MinStatConstraint extends Constraint {
  private readonly stat: EnumWakfuStat;
  private readonly minValue: number;
  private readonly penalty: number;

  constructor(
    stat: EnumWakfuStat,
    minValue: number,
    type: EnumConstraintType = EnumConstraintType.Blocking,
    penalty: number = 1000,
  ) {
    super(type, `Min ${stat}`, `The stat ${stat} must be at least ${minValue}`);
    this.stat = stat;
    this.minValue = minValue;
    this.penalty = penalty;
  }

  public evaluate(build: WakfuBuild, equipment: TBuildCandidateEquipment): TConstraintEvaluationResult {
    const stats = new WakfuStats();

    stats.merge(build.getStatsWithoutEquipment());

    for (const [_position, item] of Object.entries(equipment)) {
      if (item) {
        stats.merge(item.getStats());
      }
    }

    stats.applyElementalPreferences(build.getElementalPreferences());
    stats.applyEffects();

    const statValue = stats.get(this.stat);
    const satisfied = statValue >= this.minValue;

    return {
      satisfied,
      message: satisfied
        ? `${this.stat} = ${statValue} (>= ${this.minValue})`
        : `${this.stat} = ${statValue} (< ${this.minValue})`,
      penalty: satisfied ? 0 : this.penalty,
    };
  }

  public getStat(): EnumWakfuStat {
    return this.stat;
  }

  public getMinValue(): number {
    return this.minValue;
  }
}
