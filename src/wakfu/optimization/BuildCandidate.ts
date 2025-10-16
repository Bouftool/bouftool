import type { WakfuBuild } from "../builds/build";
import type { WakfuItem } from "../items";
import { EnumWakfuEquipmentPosition } from "../itemTypes/types";
import { WakfuStats } from "../stats";
import type { TElementalPreferences } from "../stats/types";
import type { ConstraintManager } from "./constraints/ConstraintManager";
import type { TBuildCandidateEquipment, TBuildOptimizationResult } from "./types";
import type { TItemScorerConfig } from "./utils/ItemScorer";
import { ItemScorer } from "./utils/ItemScorer";

export class BuildCandidate {
  private readonly build: WakfuBuild;
  private readonly equipment: TBuildCandidateEquipment;
  private readonly scorer: ItemScorer;
  private score: number | null = null;
  private stats: WakfuStats | null = null;

  constructor(
    build: WakfuBuild,
    equipment: TBuildCandidateEquipment,
    scorerConfig: TItemScorerConfig,
    elementalPreferences: TElementalPreferences,
  ) {
    this.build = build;
    this.equipment = equipment;
    this.scorer = new ItemScorer(scorerConfig, elementalPreferences);
  }

  public static fromBuild(build: WakfuBuild, scorerConfig: TItemScorerConfig): BuildCandidate {
    const equipment: TBuildCandidateEquipment = {};

    for (const position of Object.values(EnumWakfuEquipmentPosition)) {
      const item = build.getEquippedItem(position);
      if (item) {
        equipment[position] = item;
      }
    }

    return new BuildCandidate(build, equipment, scorerConfig, build.getElementalPreferences());
  }

  public static fromBuildPartial(
    build: WakfuBuild,
    scorerConfig: TItemScorerConfig,
    keepSlots: EnumWakfuEquipmentPosition[],
  ): BuildCandidate {
    const equipment: TBuildCandidateEquipment = {};

    for (const position of keepSlots) {
      const item = build.getEquippedItem(position);
      if (item) {
        equipment[position] = item;
      }
    }

    return new BuildCandidate(build, equipment, scorerConfig, build.getElementalPreferences());
  }

  public static empty(build: WakfuBuild, scorerConfig: TItemScorerConfig): BuildCandidate {
    return new BuildCandidate(build, {}, scorerConfig, build.getElementalPreferences());
  }

  public clone(): BuildCandidate {
    return new BuildCandidate(
      this.build,
      { ...this.equipment },
      this.scorer.getConfig(),
      this.build.getElementalPreferences(),
    );
  }

  public getScore(): number {
    if (this.score === null) {
      this.score = this.calculateScore();
    }
    return this.score;
  }

  private calculateScore(): number {
    let totalScore = 0;

    for (const position of Object.values(EnumWakfuEquipmentPosition)) {
      const item = this.equipment[position];
      if (item) {
        totalScore += this.scorer.scoreItem(item);
      }
    }

    return totalScore;
  }

  public getStats(): WakfuStats {
    if (this.stats === null) {
      this.stats = this.calculateStats();
    }
    return this.stats;
  }

  private calculateStats(): WakfuStats {
    const stats = new WakfuStats();

    for (const position of Object.values(EnumWakfuEquipmentPosition)) {
      const item = this.equipment[position];
      if (item) {
        stats.merge(item.getStats());
      }
    }

    stats.applyElementalPreferences(this.build.getElementalPreferences());
    stats.applyEffects();

    return stats;
  }

  public equipItem(position: EnumWakfuEquipmentPosition, item: WakfuItem | null): void {
    this.equipment[position] = item;
    this.score = null;
    this.stats = null;
  }

  public getEquippedItem(position: EnumWakfuEquipmentPosition): WakfuItem | null {
    return this.equipment[position] || null;
  }

  public getEquipment(): TBuildCandidateEquipment {
    return { ...this.equipment };
  }

  public getBuild(): WakfuBuild {
    return this.build;
  }

  public evaluate(constraintManager: ConstraintManager): TBuildOptimizationResult {
    const constraintResult = constraintManager.evaluate(this.build, this.equipment);

    return {
      equipment: this.getEquipment(),
      score: this.getScore() - constraintResult.totalPenalty,
      valid: constraintResult.valid,
      meetsObjectives: constraintResult.meetsObjectives,
      penalties: constraintResult.totalPenalty,
      violations: constraintResult.violations,
    };
  }

  public getHash(): string {
    const itemIds = Object.values(EnumWakfuEquipmentPosition)
      .map((position) => {
        const item = this.equipment[position];
        return item ? item.getId() : 0;
      })
      .sort((a, b) => a - b);

    return itemIds.join("-");
  }

  public equals(other: BuildCandidate): boolean {
    return this.getHash() === other.getHash();
  }
}
