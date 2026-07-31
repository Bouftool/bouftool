export type TResult<Value, Error> = { ok: true; value: Value } | { ok: false; error: Error };

export const success = <Value>(value: Value): TResult<Value, never> => ({ ok: true, value });
export const failure = <Error>(error: Error): TResult<never, Error> => ({ ok: false, error });
