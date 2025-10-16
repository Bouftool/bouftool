import type { WakfuBuild } from "../../builds/build";
import { WakfuStats } from "../../stats";
import type { EnumWakfuStat } from "../../stats/types";
import type { TBuildCandidateEquipment, TConstraintEvaluationResult } from "../types";
import { EnumConstraintType } from "../types";
import { Constraint } from "./Constraint";

export class MaxStatConstraint extends Constraint {
  private readonly stat: EnumWakfuStat;
  private readonly maxValue: number;
  private readonly penalty: number;

  constructor(
    stat: EnumWakfuStat,
    maxValue: number,
    type: EnumConstraintType = EnumConstraintType.Blocking,
    penalty: number = 1000,
  ) {
    super(type, `Max ${stat}`, `The stat ${stat} must not exceed ${maxValue}`);
    this.stat = stat;
    this.maxValue = maxValue;
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
    const satisfied = statValue <= this.maxValue;

    return {
      satisfied,
      message: satisfied
        ? `${this.stat} = ${statValue} (<= ${this.maxValue})`
        : `${this.stat} = ${statValue} (> ${this.maxValue})`,
      penalty: satisfied ? 0 : this.penalty,
    };
  }

  public getStat(): EnumWakfuStat {
    return this.stat;
  }

  public getMaxValue(): number {
    return this.maxValue;
  }
}
