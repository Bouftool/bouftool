import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { BundledRulePackSource, loadBundledRulePack, loadRulePack } from "./rules";

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

const manifestFor = (modules: Record<"effects" | "eligibility" | "states" | "modifications", string>) =>
  JSON.stringify({
    schemaVersion: 1,
    wakfuVersion: "test",
    modules: {
      effects: sha256(modules.effects),
      eligibility: sha256(modules.eligibility),
      states: sha256(modules.states),
      modifications: sha256(modules.modifications),
    },
  });

describe("equipment rule pack", () => {
  it("loads all bundled modules atomically", () => {
    const result = loadBundledRulePack();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.manifest.wakfuVersion).toBe("1.92.1.59");
      expect(result.value.eligibility.eligibilityCoverage).toBe("incomplete");
      expect(result.value.effects.actions).toHaveLength(19);
    }
  });

  it("rejects a hash mismatch without exposing a partial pack", () => {
    const result = loadRulePack(
      JSON.stringify({
        schemaVersion: 1,
        wakfuVersion: "1",
        modules: { effects: "bad", eligibility: "bad", states: "bad", modifications: "bad" },
      }),
      { effects: "{}", eligibility: "{}", states: "{}", modifications: "{}" },
    );
    expect(result).toEqual({ ok: false, error: { kind: "RulePackHashMismatch", module: "effects" } });
  });

  it("rejects unknown fields through closed schemas", () => {
    const manifest = JSON.stringify({
      schemaVersion: 1,
      wakfuVersion: "1",
      unexpected: true,
      modules: { effects: "bad", eligibility: "bad", states: "bad", modifications: "bad" },
    });
    expect(loadRulePack(manifest, { effects: "{}", eligibility: "{}", states: "{}", modifications: "{}" })).toEqual({
      ok: false,
      error: { kind: "InvalidRulePackManifest" },
    });
  });

  it("rejects malformed JSON and each invalid module atomically", () => {
    expect(loadRulePack("{", BundledRulePackSource.modules)).toEqual({
      ok: false,
      error: { kind: "InvalidRulePackManifest" },
    });
    for (const moduleName of ["effects", "eligibility", "states", "modifications"] as const) {
      const modules = { ...BundledRulePackSource.modules, [moduleName]: "{}" };
      expect(loadRulePack(manifestFor(modules), modules)).toEqual({
        ok: false,
        error: { kind: "InvalidRulePackModule", module: moduleName },
      });
    }
  });
});
