import { createContext, useContext, useState } from "react";
import {
  isNavigationContextView,
  NavigationView,
  type TNavigationContext,
  type TNavigationParams,
  type TNavigationProviderProps,
} from "./types";

const context = createContext<TNavigationContext | undefined>(undefined);

export function useNavigationContext(): TNavigationContext;
export function useNavigationContext<View extends NavigationView>(
  view: View,
): Extract<TNavigationContext, { currentView: View }>;
export function useNavigationContext(view?: NavigationView): TNavigationContext {
  const value = useContext(context);
  if (value === undefined) {
    throw new Error("useNavigationContext must be used within a NavigationProvider");
  }
  if (view !== undefined && !isNavigationContextView(value, view)) {
    throw new Error(`useNavigationContext called with invalid view: ${view}`);
  }
  return value;
}

export const NavigationProvider = ({ children }: TNavigationProviderProps) => {
  const [state, setState] = useState<TNavigationContext>({
    currentView: NavigationView.Builds,
    params: undefined,
    setCurrentView: () => undefined,
  });

  const setCurrentView = <NewView extends NavigationView>(view: NewView, params: TNavigationParams[NewView]) => {
    switch (view) {
      case NavigationView.BuildDetails:
        if (params === undefined) {
          throw new Error("Build details navigation requires parameters");
        }
        setState({ currentView: NavigationView.BuildDetails, params, setCurrentView });
        break;
      case NavigationView.Builds:
      case NavigationView.EncyclopediaEquipment:
      case NavigationView.CraftManager:
        setState({ currentView: view, params: undefined, setCurrentView });
        break;
    }
  };

  const contextValue = { ...state, setCurrentView } satisfies TNavigationContext;
  return <context.Provider value={contextValue}>{children}</context.Provider>;
};
