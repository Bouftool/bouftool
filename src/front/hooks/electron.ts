import { useCallback, useEffect, useRef, useState } from "react";
import type { ElectronEvents, ElectronEventsMain, ElectronEventsRenderer } from "src/electron/types";

export type SendElectronEvent<E extends ElectronEvents> = (
  args: ElectronEventsMain[E],
) => Promise<ElectronEventsRenderer[E]>;

export const useElectronEvent = <E extends ElectronEvents>(event: E, global = false) => {
  const currentPendingRequest = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ElectronEventsRenderer[E] | null>(null);

  const send = useCallback(
    (payload: ElectronEventsMain[E]) => {
      setLoading(true);
      const id = crypto.randomUUID();
      currentPendingRequest.current = id;
      return sendElectronEvent(event, payload, id);
    },
    [event],
  );

  useEffect(() => {
    const listener = window.electron.addListener(event, (pkg) => {
      if (pkg.id === null) {
        setResponse(pkg.payload);
      } else if (global || pkg.id === currentPendingRequest.current) {
        setLoading(false);
        setResponse(pkg.payload);
      }
    });
    return () => window.electron.removeListener(event, listener);
  }, [global, event]);

  return [send, response, loading] as const;
};

export const sendElectronEvent = <E extends ElectronEvents>(
  event: E,
  payload: ElectronEventsMain[E],
  requestId: string = crypto.randomUUID(),
) =>
  new Promise<ElectronEventsRenderer[E]>((resolve) => {
    const listener = window.electron.addListener(event, (response) => {
      if (response.id === requestId) {
        resolve(response.payload);
        window.electron.removeListener(event, listener);
      }
    });
    window.electron.send(event, { id: requestId, payload });
  });
