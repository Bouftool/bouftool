import { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { describe, expect, it } from "vitest";
import { getModalCompareItemCardKey } from "./key";

describe("getModalCompareItemCardKey", () => {
  it("distinguishes comparison positions with the same item identities", () => {
    const sourceItems = [{ id: 1234 }];

    expect(getModalCompareItemCardKey(EnumWakfuEquipmentPosition.LeftHand, 5678, sourceItems)).toBe(
      "position-LEFT_HAND|target-5678|item-1234",
    );
    expect(getModalCompareItemCardKey(EnumWakfuEquipmentPosition.RightHand, 5678, sourceItems)).toBe(
      "position-RIGHT_HAND|target-5678|item-1234",
    );
  });
});
