import { createHash } from "node:crypto";
import Ajv from "ajv";
import { failure, success, type TResult } from "./result";
import effectsRaw from "./rule-pack/effects.json?raw";
import eligibilityRaw from "./rule-pack/eligibility.json?raw";
import manifestRaw from "./rule-pack/manifest.json?raw";
import modificationsRaw from "./rule-pack/modifications.json?raw";
import statesRaw from "./rule-pack/states.json?raw";

type TRulePackManifest = {
  schemaVersion: 1;
  wakfuVersion: string;
  modules: Record<TRuleModuleName, string>;
};

type TEffectsRules = {
  schemaVersion: 1;
  source: string;
  actions: { actionId: number; stat: string }[];
};

type TEligibilityRules = {
  schemaVersion: 1;
  wakfuVersion: string;
  eligibilityCoverage: "complete" | "incomplete";
  includedTypeIds: number[];
  excludedItemIds: number[];
};

type TStateRules = {
  schemaVersion: 1;
  rules: { stateId: number; classification: string }[];
};

type TModificationRules = {
  schemaVersion: 1;
  phase: 1;
  candidateEnchantments: false;
  candidateSublimations: false;
  existingBuildContributionPolicy: "evaluate";
};

const RuleModuleName = {
  Effects: "effects",
  Eligibility: "eligibility",
  States: "states",
  Modifications: "modifications",
} as const;

type TRuleModuleName = (typeof RuleModuleName)[keyof typeof RuleModuleName];

export type TRulePack = {
  manifest: Readonly<TRulePackManifest>;
  effects: Readonly<TEffectsRules>;
  eligibility: Readonly<TEligibilityRules>;
  states: Readonly<TStateRules>;
  modifications: Readonly<TModificationRules>;
};

export type TRulePackError =
  | { kind: "InvalidRulePackManifest" }
  | { kind: "RulePackHashMismatch"; module: TRuleModuleName }
  | { kind: "InvalidRulePackModule"; module: TRuleModuleName };

type TRawRuleModules = Record<TRuleModuleName, string>;

const ajv = new Ajv();
const stringSchema = { type: "string" };
const integerSchema = { type: "integer" };

const manifestValidator = ajv.compile<TRulePackManifest>({
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "wakfuVersion", "modules"],
  properties: {
    schemaVersion: { const: 1 },
    wakfuVersion: stringSchema,
    modules: {
      type: "object",
      additionalProperties: false,
      required: ["effects", "eligibility", "states", "modifications"],
      properties: {
        effects: stringSchema,
        eligibility: stringSchema,
        states: stringSchema,
        modifications: stringSchema,
      },
    },
  },
});

const effectsValidator = ajv.compile<TEffectsRules>({
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "source", "actions"],
  properties: {
    schemaVersion: { const: 1 },
    source: stringSchema,
    actions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["actionId", "stat"],
        properties: { actionId: integerSchema, stat: stringSchema },
      },
    },
  },
});

const eligibilityValidator = ajv.compile<TEligibilityRules>({
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "wakfuVersion", "eligibilityCoverage", "includedTypeIds", "excludedItemIds"],
  properties: {
    schemaVersion: { const: 1 },
    wakfuVersion: stringSchema,
    eligibilityCoverage: { enum: ["complete", "incomplete"] },
    includedTypeIds: { type: "array", items: integerSchema },
    excludedItemIds: { type: "array", items: integerSchema },
  },
});

const statesValidator = ajv.compile<TStateRules>({
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "rules"],
  properties: {
    schemaVersion: { const: 1 },
    rules: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["stateId", "classification"],
        properties: { stateId: integerSchema, classification: stringSchema },
      },
    },
  },
});

const modificationsValidator = ajv.compile<TModificationRules>({
  type: "object",
  additionalProperties: false,
  required: [
    "schemaVersion",
    "phase",
    "candidateEnchantments",
    "candidateSublimations",
    "existingBuildContributionPolicy",
  ],
  properties: {
    schemaVersion: { const: 1 },
    phase: { const: 1 },
    candidateEnchantments: { const: false },
    candidateSublimations: { const: false },
    existingBuildContributionPolicy: { const: "evaluate" },
  },
});

const parseJson = (raw: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const sha256 = (raw: string) => createHash("sha256").update(raw).digest("hex");

export const loadRulePack = (rawManifest: string, rawModules: TRawRuleModules): TResult<TRulePack, TRulePackError> => {
  const manifest = parseJson(rawManifest);
  if (!manifestValidator(manifest)) {
    return failure({ kind: "InvalidRulePackManifest" });
  }
  for (const moduleName of Object.values(RuleModuleName)) {
    if (sha256(rawModules[moduleName]) !== manifest.modules[moduleName]) {
      return failure({ kind: "RulePackHashMismatch", module: moduleName });
    }
  }
  const effects = parseJson(rawModules.effects);
  if (!effectsValidator(effects)) {
    return failure({ kind: "InvalidRulePackModule", module: "effects" });
  }
  const eligibility = parseJson(rawModules.eligibility);
  if (!eligibilityValidator(eligibility)) {
    return failure({ kind: "InvalidRulePackModule", module: "eligibility" });
  }
  const states = parseJson(rawModules.states);
  if (!statesValidator(states)) {
    return failure({ kind: "InvalidRulePackModule", module: "states" });
  }
  const modifications = parseJson(rawModules.modifications);
  if (!modificationsValidator(modifications)) {
    return failure({ kind: "InvalidRulePackModule", module: "modifications" });
  }
  return success(Object.freeze({ manifest, effects, eligibility, states, modifications }));
};

export const BundledRulePackSource = Object.freeze({
  manifest: manifestRaw,
  modules: Object.freeze({
    effects: effectsRaw,
    eligibility: eligibilityRaw,
    states: statesRaw,
    modifications: modificationsRaw,
  }),
});

export const loadBundledRulePack = () => loadRulePack(BundledRulePackSource.manifest, BundledRulePackSource.modules);
