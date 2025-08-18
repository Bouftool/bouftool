import { isArrayOf, isNumber, isObject } from "src/types/utils";
import { isWakfuDescription, loadWakfuDescriptionFromJson, type TWakfuDescription } from "./description";

export type TWakfuEffect = {
  id: number;
  actionId: number;
  areaShape: number;
  areaSize: number[];
  params: number[];
  description?: TWakfuDescription;
};

export const loadWakfuEffectFromJson = (json: unknown) => {
  if (
    isObject(json) &&
    "effect" in json &&
    isObject(json.effect) &&
    "definition" in json.effect &&
    isObject(json.effect.definition) &&
    "id" in json.effect.definition &&
    isNumber(json.effect.definition.id) &&
    "actionId" in json.effect.definition &&
    isNumber(json.effect.definition.actionId) &&
    "areaShape" in json.effect.definition &&
    isNumber(json.effect.definition.areaShape) &&
    "areaSize" in json.effect.definition &&
    Array.isArray(json.effect.definition.areaSize) &&
    "params" in json.effect.definition &&
    Array.isArray(json.effect.definition.params)
  ) {
    return {
      id: json.effect.definition.id,
      actionId: json.effect.definition.actionId,
      areaShape: json.effect.definition.areaShape,
      areaSize: json.effect.definition.areaSize,
      params: json.effect.definition.params,
      description: "description" in json.effect ? loadWakfuDescriptionFromJson(json.effect.description) : undefined,
    };
  }
  throw new Error("Invalid JSON: WakfuEffect");
};

export const isWakfuEffect = (json: unknown): json is TWakfuEffect => {
  return (
    isObject(json) &&
    "id" in json &&
    isNumber(json.id) &&
    "actionId" in json &&
    isNumber(json.actionId) &&
    "areaShape" in json &&
    isNumber(json.areaShape) &&
    "areaSize" in json &&
    isArrayOf(json.areaSize, isNumber) &&
    "params" in json &&
    isArrayOf(json.params, isNumber) &&
    (!("description" in json) || isWakfuDescription(json.description))
  );
};
