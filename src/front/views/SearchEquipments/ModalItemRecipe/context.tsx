import { createContext, type ReactNode, useCallback, useContext, useState } from "react";
import type { WakfuItem } from "src/wakfu/items";
import { ModalItemRecipe, type TModalItemRecipeProps } from "./index";

export type TModalItemRecipeContext = (item: ReturnType<WakfuItem["toObject"]>) => void;

const Context = createContext<TModalItemRecipeContext | undefined>(undefined);

export const useModalItemRecipeContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useModalItemRecipeContext must be used within a ModalItemRecipeProvider");
  }
  return context;
};

export type TModalItemRecipeProviderProps = {
  children: ReactNode;
};

export const ModalItemRecipeProvider = ({ children }: TModalItemRecipeProviderProps) => {
  const [state, setState] = useState<Omit<TModalItemRecipeProps, "onClose">>({ open: false, item: null });

  const openModalRecipe = useCallback((item: ReturnType<WakfuItem["toObject"]>) => {
    setState({ open: true, item });
  }, []);

  return (
    <Context.Provider value={openModalRecipe}>
      {children}
      <ModalItemRecipe
        open={state.open}
        item={state.item}
        onClose={() => setState((prev) => ({ ...prev, open: false }))}
      />
    </Context.Provider>
  );
};
