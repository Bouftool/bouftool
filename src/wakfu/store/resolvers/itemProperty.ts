import type { JSONSchema } from "json-schema-to-ts";

export const WakfuItemPropertySchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    description: { type: "string" },
  },
  required: ["id", "name", "description"],
} as const satisfies JSONSchema;
