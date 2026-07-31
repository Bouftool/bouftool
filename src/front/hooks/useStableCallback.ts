import { useCallback, useRef } from "react";

export const useStableCallback = <Args extends unknown[], Return>(callback: (...args: Args) => Return) => {
  const ref = useRef(callback);
  ref.current = callback;
  return useCallback((...args: Args): Return => {
    return ref.current(...args);
  }, []);
};
