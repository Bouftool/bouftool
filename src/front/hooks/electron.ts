import { useCallback, useEffect, useState } from "react";
import type { ElectronEvents, ElectronEventsMain, ElectronEventsRenderer } from "src/electron/types";

export const useElectronEvent = <E extends ElectronEvents>(event: E) => {
  const [response, setResponse] = useState<ElectronEventsRenderer[E] | null>(null);

  const send = useCallback(
    (payload: ElectronEventsMain[E]) => {
      window.electron.send(event, payload);
    },
    [event],
  );

  useEffect(() => {
    window.electron.receive(event, (payload) => {
      setResponse(payload);
    });
  }, [event]);

  return [send, response] as const;
};
