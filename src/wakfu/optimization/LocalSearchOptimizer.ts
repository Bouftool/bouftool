import type { WakfuBuild } from "../builds/build";
import { RandomizedLocalSearch } from "./algorithms/RandomizedLocalSearch";
import type { Constraint } from "./constraints/Constraint";
import { ConstraintManager } from "./constraints/ConstraintManager";
import type { TBuildOptimizationConfig, TBuildOptimizationResult, TOptimizationProgressCallback } from "./types";
import { DEFAULT_ALGORITHM_PARAMS } from "./types";

export class LocalSearchOptimizer {
  private readonly build: WakfuBuild;
  private readonly config: TBuildOptimizationConfig;
  private readonly constraintManager: ConstraintManager;

  constructor(build: WakfuBuild, config: TBuildOptimizationConfig) {
    this.build = build;
    this.config = config;
    this.constraintManager = new ConstraintManager();
  }

  public addConstraint(constraint: Constraint): void {
    this.constraintManager.addConstraint(constraint);
  }

  public addConstraints(constraints: Constraint[]): void {
    this.constraintManager.addConstraints(constraints);
  }

  public removeConstraint(constraint: Constraint): void {
    this.constraintManager.removeConstraint(constraint);
  }

  public clearConstraints(): void {
    this.constraintManager.clear();
  }

  public optimize(progressCallback?: TOptimizationProgressCallback): TBuildOptimizationResult[] {
    const runs = this.config.algorithm?.runs ?? DEFAULT_ALGORITHM_PARAMS.runs;

    if (runs === 1) {
      const algorithm = new RandomizedLocalSearch(this.build, this.config, this.constraintManager);
      return algorithm.optimize(progressCallback);
    }

    return this.optimizeMultiRun(runs, progressCallback);
  }

  private optimizeMultiRun(runs: number, progressCallback?: TOptimizationProgressCallback): TBuildOptimizationResult[] {
    const allResults: TBuildOptimizationResult[] = [];
    const baseSeed = this.config.algorithm?.randomSeed ?? Date.now();

    for (let run = 0; run < runs; run++) {
      const runConfig: TBuildOptimizationConfig = {
        ...this.config,
        algorithm: {
          ...this.config.algorithm,
          randomSeed: baseSeed + run,
          runs: 1, // Never touch this
        },
      };

      const runProgressCallback = progressCallback
        ? (progress: TOptimizationProgressCallback extends (p: infer P) => void ? P : never) => {
            progressCallback({
              ...progress,
              currentIteration: progress.currentIteration + run * (progress.totalIterations || 0),
              totalIterations: (progress.totalIterations || 0) * runs,
            });
          }
        : undefined;

      const algorithm = new RandomizedLocalSearch(this.build, runConfig, this.constraintManager);
      const results = algorithm.optimize(runProgressCallback);

      allResults.push(...results.filter((r) => r.valid));
    }

    const solutionCount = this.config.algorithm?.solutionCount ?? DEFAULT_ALGORITHM_PARAMS.solutionCount;
    allResults.sort((a, b) => b.score - a.score);

    const uniqueResults: TBuildOptimizationResult[] = [];
    const seenHashes = new Set<string>();

    for (const result of allResults) {
      const hash = Object.values(result.equipment)
        .map((item) => item?.getId() ?? 0)
        .sort((a, b) => a - b)
        .join("-");

      if (!seenHashes.has(hash)) {
        seenHashes.add(hash);
        uniqueResults.push(result);

        if (uniqueResults.length >= solutionCount) {
          break;
        }
      }
    }

    return uniqueResults;
  }

  public getConstraintManager(): ConstraintManager {
    return this.constraintManager;
  }

  public getBuild(): WakfuBuild {
    return this.build;
  }

  public getConfig(): TBuildOptimizationConfig {
    return this.config;
  }
}
