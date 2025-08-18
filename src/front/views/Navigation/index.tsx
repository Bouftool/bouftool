import { createContext, useContext, useState } from "react";
import { BuildsDashboard } from "../BuildsDashboard";
import { CreateBuild } from "../CreateBuild";
import { SearchEquipments } from "../SearchEquipments";
import { type NavigationContext, NavigationView, type TNavigationProviderProps } from "./types";

const context = createContext<NavigationContext | undefined>(undefined);

export const useNavigationContext = () => {
  const value = useContext(context);
  if (value === undefined) {
    throw new Error("useNavigationContext must be used within a NavigationProvider");
  }
  return value;
};

export const NavigationProvider = ({ children }: TNavigationProviderProps) => {
  const [currentView, setCurrentView] = useState<NavigationView>(NavigationView.Builds);

  return <context.Provider value={{ currentView, setCurrentView }}>{children}</context.Provider>;
};

export const Navigation = () => {
  const { currentView } = useNavigationContext();

  switch (currentView) {
    case NavigationView.Builds:
      return <BuildsDashboard />;
    case NavigationView.BuildCreate:
      return <CreateBuild />;
    case NavigationView.EncyclopediaEquipment:
      return <SearchEquipments />;
    default:
      return null;
  }
};
