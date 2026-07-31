import { describe, expect, it } from "vitest";
import { createEquipmentCatalog } from "./catalog";
import { compareEvaluatedBuilds, evaluateHypotheticalReplacement } from "./comparison";
import { enumerateLoadouts } from "./enumerator";
import { evaluateLoadout } from "./evaluator";
import { evaluateLegality, isStrictViolationSubset } from "./legality";
import type { TEquipmentCatalog, TEquipmentLoadout, TEquipmentRuleContext } from "./types";

const context: TEquipmentRuleContext = {
  characterLevel: 100,
  characterBreed: 1,
  enabledSlots: ["HEAD", "LEFT_HAND", "RIGHT_HAND"],
  eligibilityFlags: [],
  missingHealthPercent: null,
  fixedStats: { healthPoint: 100n },
};

const catalog: TEquipmentCatalog = {
  eligibilityCoverage: "incomplete",
  items: [
    {
      definitionId: 1,
      level: 100,
      rarity: 1,
      positions: ["HEAD"],
      disabledPositions: [],
      allowedBreedIds: [],
      effects: [{ kind: "add", stat: "healthPoint", value: 20n }],
      optimizerCandidate: true,
    },
    {
      definitionId: 2,
      level: 100,
      rarity: 5,
      positions: ["LEFT_HAND", "RIGHT_HAND"],
      disabledPositions: [],
      allowedBreedIds: [1],
      effects: [{ kind: "add", stat: "actionPoint", value: 1n }],
      optimizerCandidate: true,
    },
    {
      definitionId: 3,
      level: 101,
      rarity: 5,
      positions: ["RIGHT_HAND"],
      disabledPositions: [],
      allowedBreedIds: [],
      effects: [],
      optimizerCandidate: true,
    },
  ],
};

const loadout: TEquipmentLoadout = {
  schemaVersion: 1,
  placements: [
    { slot: "HEAD", definitionId: 1, copyId: "1:0", allocation: null, modifications: [] },
    { slot: "LEFT_HAND", definitionId: 2, copyId: "2:0", allocation: null, modifications: [] },
  ],
};

describe("canonical evaluation", () => {
  it("constructs an immutable catalog without retaining mutable input arrays", () => {
    const sourceItems = [
      ...catalog.items,
      {
        definitionId: 30,
        level: 1,
        rarity: 1,
        positions: ["HEAD"],
        disabledPositions: [],
        allowedBreedIds: [],
        requiredEligibilityFlags: ["tested"],
        effects: [{ kind: "addRational", stat: "healthPoint", value: { numerator: 1n, denominator: 2n } }],
        optimizerCandidate: true,
      },
    ] satisfies TEquipmentCatalog["items"];
    const immutable = createEquipmentCatalog("incomplete", sourceItems);
    sourceItems.length = 0;
    expect(immutable.items).toHaveLength(4);
    expect(Object.isFrozen(immutable)).toBe(true);
    expect(Object.isFrozen(immutable.items[0].effects)).toBe(true);
    expect(Object.isFrozen(immutable.items[3].effects[0])).toBe(true);
    expect(Reflect.set(immutable.items[0].positions, 0, "RIGHT_HAND")).toBe(false);
  });
  it("evaluates exact totals and marks incomplete eligibility as non-proof", () => {
    expect(evaluateLoadout(catalog, loadout, context)).toMatchObject({
      legal: true,
      proofEligible: false,
      stats: { actionPoint: 1n, healthPoint: 120n },
    });
  });

  it("returns stable violations for duplicate definitions, rarity caps, level, breed, and disabled slots", () => {
    const illegal: TEquipmentLoadout = {
      schemaVersion: 1,
      placements: [
        { slot: "LEFT_HAND", definitionId: 2, copyId: "2:0", allocation: null, modifications: [] },
        { slot: "RIGHT_HAND", definitionId: 2, copyId: "2:1", allocation: null, modifications: [] },
        { slot: "RIGHT_HAND", definitionId: 3, copyId: "3:0", allocation: null, modifications: [] },
      ],
    };
    expect(evaluateLegality(catalog, illegal, context).map((violation) => violation.id)).toEqual([
      "duplicate-definition:2",
      "item-level:3",
      "rarity-cap:5",
      "slot-capacity:RIGHT_HAND",
    ]);
  });

  it("accepts only strict-subset repairs for an illegal origin", () => {
    expect(isStrictViolationSubset(["a"], ["a", "b"])).toBe(true);
    expect(isStrictViolationSubset(["a", "b"], ["a", "b"])).toBe(false);
    expect(isStrictViolationSubset(["a", "c"], ["a", "b"])).toBe(false);
  });

  it("reports every guarded legality boundary", () => {
    const guardedCatalog: TEquipmentCatalog = {
      eligibilityCoverage: "complete",
      items: [
        {
          definitionId: 10,
          level: 1,
          rarity: 1,
          positions: ["HEAD"],
          disabledPositions: ["RIGHT_HAND"],
          allowedBreedIds: [2],
          requiredEligibilityFlags: ["special"],
          effects: [],
          optimizerCandidate: true,
        },
      ],
    };
    const guardedLoadout: TEquipmentLoadout = {
      schemaVersion: 1,
      placements: [
        { slot: "LEFT_HAND", definitionId: 10, copyId: "same", allocation: null, modifications: [] },
        { slot: "RIGHT_HAND", definitionId: 999, copyId: "same", allocation: null, modifications: [] },
      ],
    };
    expect(evaluateLegality(guardedCatalog, guardedLoadout, context).map((violation) => violation.kind)).toEqual([
      "breed",
      "disabled-position",
      "duplicate-copy",
      "eligibility-flag",
      "invalid-position",
      "missing-definition",
    ]);
    expect(
      evaluateLegality(guardedCatalog, guardedLoadout, { ...context, eligibilityFlags: ["special"] }),
    ).not.toContainEqual(expect.objectContaining({ kind: "eligibility-flag" }));
  });

  it("evaluates rational and health effects and records non-proof diagnostics", () => {
    const effectCatalog: TEquipmentCatalog = {
      eligibilityCoverage: "complete",
      items: [
        {
          definitionId: 20,
          level: 1,
          rarity: 1,
          positions: ["HEAD"],
          disabledPositions: [],
          allowedBreedIds: [],
          effects: [
            { kind: "marker", stateId: 1 },
            { kind: "addRational", stat: "resistance", value: { numerator: 15n, denominator: 2n } },
            { kind: "missingHealth", stat: "mastery", numeratorPerPercent: 2n, denominator: 1n },
            { kind: "unsupported", signature: "future", policy: "zero-diagnostic" },
          ],
          optimizerCandidate: true,
        },
      ],
    };
    const oneItem: TEquipmentLoadout = {
      schemaVersion: 1,
      placements: [{ slot: "HEAD", definitionId: 20, copyId: "20:0", allocation: null, modifications: [] }],
    };
    expect(evaluateLoadout(effectCatalog, oneItem, { ...context, missingHealthPercent: 25 })).toMatchObject({
      stats: { healthPoint: 100n, mastery: 50n, resistance: 7n },
      diagnostics: [{ id: "unsupported-effect:future", kind: "unsupported-effect" }],
      proofEligible: false,
    });
    expect(evaluateLoadout(effectCatalog, oneItem, context).diagnostics).toEqual([
      { id: "missing-health-context:mastery", kind: "missing-health-context" },
      { id: "unsupported-effect:future", kind: "unsupported-effect" },
    ]);
    expect(
      evaluateLoadout(
        effectCatalog,
        {
          schemaVersion: 1,
          placements: [{ slot: "HEAD", definitionId: 999, copyId: "999:0", allocation: null, modifications: [] }],
        },
        context,
      ).stats,
    ).toEqual({ healthPoint: 100n });
  });
});

describe("reference enumerator", () => {
  it("enumerates only legal loadouts and preserves candidate-copy identity", () => {
    const results = enumerateLoadouts(catalog, context, ["HEAD"]);
    expect(results.map((result) => result.loadout.placements.map((placement) => placement.definitionId))).toEqual([
      [],
      [1],
    ]);
  });

  it("enumerates the empty loadout for an empty slot topology", () => {
    expect(enumerateLoadouts(catalog, context, [])).toHaveLength(1);
    expect(enumerateLoadouts(catalog, context, ["LEFT_HAND", "RIGHT_HAND"])).toHaveLength(3);
  });
});

describe("comparison", () => {
  it("compares exact totals and decisions without mutating the origin", () => {
    const before = evaluateLoadout(catalog, loadout, context);
    const replacement = {
      slot: "HEAD",
      definitionId: 1,
      copyId: "1:replacement",
      allocation: null,
      modifications: [],
    } satisfies TEquipmentLoadout["placements"][number];
    const after = evaluateHypotheticalReplacement(catalog, loadout, replacement, context);
    expect(loadout.placements[0].copyId).toBe("1:0");
    expect(compareEvaluatedBuilds(before, after)).toEqual({
      stats: [],
      placements: [{ slot: "HEAD", before: loadout.placements[0], after: replacement }],
    });
  });

  it("reports added, removed, and changed stat totals", () => {
    const before = evaluateLoadout(catalog, { schemaVersion: 1, placements: [] }, context);
    const after = evaluateLoadout(catalog, loadout, { ...context, fixedStats: { armor: 5n } });
    expect(compareEvaluatedBuilds(before, after).stats).toEqual([
      { stat: "actionPoint", value: 1n },
      { stat: "armor", value: 5n },
      { stat: "healthPoint", value: -80n },
    ]);
    const removed = compareEvaluatedBuilds(after, before);
    expect(removed.stats).toEqual([
      { stat: "actionPoint", value: -1n },
      { stat: "armor", value: -5n },
      { stat: "healthPoint", value: 80n },
    ]);
    expect(removed.placements).toHaveLength(2);
  });
});
