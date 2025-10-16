import type { WakfuBuild } from "../../builds/build";
import type { EnumConstraintType, TBuildCandidateEquipment, TConstraintEvaluationResult } from "../types";

export abstract class Constraint {
  protected readonly type: EnumConstraintType;
  protected readonly name: string;
  protected readonly description: string;

  constructor(type: EnumConstraintType, name: string, description: string) {
    this.type = type;
    this.name = name;
    this.description = description;
  }

  abstract evaluate(build: WakfuBuild, equipment: TBuildCandidateEquipment): TConstraintEvaluationResult;

  public getType(): EnumConstraintType {
    return this.type;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public isBlocking(): boolean {
    return this.type === "BLOCKING";
  }

  public isObjective(): boolean {
    return this.type === "OBJECTIVE";
  }
}
