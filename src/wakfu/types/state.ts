import { isNumber, isObject } from "src/types/utils";
import { loadWakfuDescriptionFromJson, type TWakfuDescription } from "./description";

export type TWakfuState = {
  id: number;
  title?: TWakfuDescription;
};

export const loadWakfuStateFromJson = (json: unknown): TWakfuState => {
  if (
    isObject(json) &&
    "definition" in json &&
    isObject(json.definition) &&
    "id" in json.definition &&
    isNumber(json.definition.id)
  ) {
    return {
      id: json.definition.id,
      title: "title" in json ? loadWakfuDescriptionFromJson(json.title) : undefined,
    };
  }
  throw new Error("Invalid JSON: WakfuState");
};
