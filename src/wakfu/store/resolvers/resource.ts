import type { JSONSchema } from "json-schema-to-ts";
import { WakfuI18nSchema } from "./i18n";

export const WakfuResourceSchema = {
  type: "object",
  properties: {
    definition: {
      type: "object",
      properties: {
        id: { type: "number" },
        resourceType: { type: "number" },
        isBlocking: { type: "boolean" },
        idealRainRangeMin: { type: "number" },
        idealRainRangeMax: { type: "number" },
        idealTemperatureRangeMin: { type: "number" },
        idealTemperatureRangeMax: { type: "number" },
        iconGfxId: { type: "number" },
        lastEvolutionStep: { type: "number" },
        usableByHeroes: { type: "boolean" },
        idealRain: { type: "number" },
      },
      required: [
        "id",
        "resourceType",
        "isBlocking",
        "idealRainRangeMin",
        "idealRainRangeMax",
        "idealTemperatureRangeMin",
        "idealTemperatureRangeMax",
        "iconGfxId",
        "lastEvolutionStep",
        "usableByHeroes",
        "idealRain",
      ],
    },
    title: WakfuI18nSchema,
  },
  required: ["definition"],
} as const satisfies JSONSchema;
