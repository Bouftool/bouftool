export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export const isArrayOf = <T>(value: unknown, predicate: (item: unknown) => item is T): value is T[] => {
  return Array.isArray(value) && value.every(predicate);
};

export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export const isObject = (value: unknown): value is object => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const isErrnoException = (error: unknown): error is NodeJS.ErrnoException => {
  return (
    isObject(error) &&
    (!("errno" in error) || isNumber(error.errno)) &&
    (!("code" in error) || isString(error.code)) &&
    (!("path" in error) || isString(error.path)) &&
    (!("syscall" in error) || isString(error.syscall))
  );
};
