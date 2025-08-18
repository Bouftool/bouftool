import type { ReactNode } from "react";

export enum NavigationView {
  Builds = 100,
  BuildCreate = 101,
  EncyclopediaEquipment = 200,
}

export type NavigationContext = {
  currentView: NavigationView;
  setCurrentView: (view: NavigationView) => void;
};

export type TNavigationProviderProps = {
  children: ReactNode;
};
