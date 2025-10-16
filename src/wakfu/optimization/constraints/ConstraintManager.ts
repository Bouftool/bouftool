import type { WakfuBuild } from "../../builds/build";
import type { TBuildCandidateEquipment } from "../types";
import { EnumConstraintType } from "../types";
import type { Constraint } from "./Constraint";

export type TConstraintManagerResult = {
  valid: boolean;
  meetsObjectives: boolean;
  totalPenalty: number;
  violations: string[];
};

export class ConstraintManager {
  private blockingConstraints: Constraint[] = [];
  private objectiveConstraints: Constraint[] = [];

  public addConstraint(constraint: Constraint): void {
    if (constraint.getType() === EnumConstraintType.Blocking) {
      this.blockingConstraints.push(constraint);
    } else {
      this.objectiveConstraints.push(constraint);
    }
  }

  public addConstraints(constraints: Constraint[]): void {
    for (const constraint of constraints) {
      this.addConstraint(constraint);
    }
  }

  public removeConstraint(constraint: Constraint): void {
    if (constraint.getType() === EnumConstraintType.Blocking) {
      const index = this.blockingConstraints.indexOf(constraint);
      if (index !== -1) {
        this.blockingConstraints.splice(index, 1);
      }
    } else {
      const index = this.objectiveConstraints.indexOf(constraint);
      if (index !== -1) {
        this.objectiveConstraints.splice(index, 1);
      }
    }
  }

  public clear(): void {
    this.blockingConstraints = [];
    this.objectiveConstraints = [];
  }

  public evaluate(build: WakfuBuild, equipment: TBuildCandidateEquipment): TConstraintManagerResult {
    let valid = true;
    let meetsObjectives = true;
    let totalPenalty = 0;
    const violations: string[] = [];

    for (const constraint of this.blockingConstraints) {
      const result = constraint.evaluate(build, equipment);
      if (!result.satisfied) {
        valid = false;
        violations.push(`[BLOQUANTE] ${constraint.getName()}: ${result.message || "Non respectée"}`);
      }
    }

    if (valid) {
      for (const constraint of this.objectiveConstraints) {
        const result = constraint.evaluate(build, equipment);
        if (!result.satisfied) {
          meetsObjectives = false;
          totalPenalty += result.penalty || 0;
          violations.push(`[OBJECTIF] ${constraint.getName()}: ${result.message || "Non respectée"}`);
        }
      }
    }

    return {
      valid,
      meetsObjectives,
      totalPenalty,
      violations,
    };
  }

  public getBlockingConstraints(): Constraint[] {
    return [...this.blockingConstraints];
  }

  public getObjectiveConstraints(): Constraint[] {
    return [...this.objectiveConstraints];
  }

  public getConstraintCount(): number {
    return this.blockingConstraints.length + this.objectiveConstraints.length;
  }
}
