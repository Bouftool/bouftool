import { failure, success, type TResult } from "./result";

export type OptimizerInt = bigint;
export type OptimizerIntWire = string;

export type TRational = {
  numerator: OptimizerInt;
  denominator: OptimizerInt;
};

const OptimizerIntWirePattern = /^(0|-[1-9][0-9]*|[1-9][0-9]*)$/;

export const parseOptimizerInt = (wire: string): TResult<OptimizerInt, "InvalidOptimizerIntWire"> => {
  if (!OptimizerIntWirePattern.test(wire)) {
    return failure("InvalidOptimizerIntWire");
  }
  return success(BigInt(wire));
};

export const decodeOptimizerInt = (wire: OptimizerIntWire): OptimizerInt => {
  const result = parseOptimizerInt(wire);
  if (!result.ok) {
    throw new Error("Invalid OptimizerIntWire");
  }
  return result.value;
};

export const encodeOptimizerInt = (value: OptimizerInt): OptimizerIntWire => value.toString();

const absolute = (value: bigint) => (value < 0n ? -value : value);

const greatestCommonDivisor = (left: bigint, right: bigint): bigint => {
  let a = absolute(left);
  let b = absolute(right);
  while (b !== 0n) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
};

export const normalizeRational = ({ numerator, denominator }: TRational): TRational => {
  if (denominator === 0n) {
    throw new Error("A rational denominator cannot be zero");
  }
  const sign = denominator < 0n ? -1n : 1n;
  const divisor = greatestCommonDivisor(numerator, denominator);
  return {
    numerator: (numerator * sign) / divisor,
    denominator: absolute(denominator) / divisor,
  };
};

export const addRational = (left: TRational, right: TRational): TRational =>
  normalizeRational({
    numerator: left.numerator * right.denominator + right.numerator * left.denominator,
    denominator: left.denominator * right.denominator,
  });

export const truncateRational = ({ numerator, denominator }: TRational): OptimizerInt => numerator / denominator;
