import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { addRational, decodeOptimizerInt, encodeOptimizerInt, normalizeRational, truncateRational } from "./integer";

describe("optimizer integer wires", () => {
  it.each(["0", "1", "-1", "9223372036854775807", "-9223372036854775808"])("round-trips canonical wire %s", (wire) =>
    expect(encodeOptimizerInt(decodeOptimizerInt(wire))).toBe(wire),
  );

  it.each(["-0", "00", "01", "+1", "1.0", "1e3", " 1", "1 "])("rejects non-canonical wire %s", (wire) => {
    expect(() => decodeOptimizerInt(wire)).toThrow("Invalid OptimizerIntWire");
  });

  it("round-trips generated integers with a fixed regression seed", () => {
    fc.assert(
      fc.property(fc.bigInt(), (value) => {
        expect(decodeOptimizerInt(encodeOptimizerInt(value))).toBe(value);
      }),
      { seed: 19_921_059, numRuns: 200 },
    );
  });
});

describe("exact rational arithmetic", () => {
  it("normalizes signs and common divisors", () => {
    expect(normalizeRational({ numerator: -6n, denominator: -8n })).toEqual({ numerator: 3n, denominator: 4n });
  });

  it("adds before truncating toward zero", () => {
    const total = addRational({ numerator: -20n, denominator: 1n }, { numerator: 127n, denominator: 10n });
    expect(truncateRational(total)).toBe(-7n);
  });

  it("rejects a zero denominator", () => {
    expect(() => normalizeRational({ numerator: 1n, denominator: 0n })).toThrow("denominator");
  });
});
