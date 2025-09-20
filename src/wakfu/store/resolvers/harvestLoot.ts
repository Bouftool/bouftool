import type { JSONSchema } from "json-schema-to-ts";

export const WakfuHarvestLootSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    itemId: { type: "number" },
    quantity: { type: "number" },
    requiredProspection: { type: "number" },
    dropRate: { type: "number" },
    listId: { type: "number" },
    quantityPerItem: { type: "number" },
    quantityMin: { type: "number" },
    quantityMax: { type: "number" },
    maxRoll: { type: "number" },
    itemIsLootList: { type: "boolean" },
  },
  required: [
    "id",
    "itemId",
    "quantity",
    "requiredProspection",
    "dropRate",
    "listId",
    "quantityPerItem",
    "quantityMin",
    "quantityMax",
    "maxRoll",
    "itemIsLootList",
  ],
} as const satisfies JSONSchema;
