import { createContext, type ReactNode, useContext, useLayoutEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";
import type { TCraftItem } from "src/wakfu/craftManager/types";

export type TCraftManagerContext = TCraftItem[] | null;

const Context = createContext<TCraftManagerContext | undefined>(undefined);

export const useCraftManagerContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCraftManagerContext must be used within a CraftManagerContextProvider");
  }
  return context;
};

export type TItemToCraftProviderProps = {
  children: ReactNode;
};

export const CraftManagerContextProvider = ({ children }: TItemToCraftProviderProps) => {
  const [getItems, items] = useElectronEvent(ElectronEvents.CraftManagerGetItems);

  // biome-ignore lint/correctness/useExhaustiveDependencies: load one time
  useLayoutEffect(() => {
    getItems(undefined);
  }, []);

  return <Context.Provider value={items}>{children}</Context.Provider>;
};
