import { BuildsDashboard } from "../Builds/Dashboard";
import { BuildDetails } from "../Builds/Details";
import { BuildDetailsProvider } from "../Builds/Details/context";
import { CraftManager } from "../CraftManager";
import { SearchEquipments } from "../SearchEquipments";
import { useNavigationContext } from "./context";
import { NavigationView } from "./types";

export { NavigationProvider, useNavigationContext } from "./context";

export const Navigation = () => {
  const { currentView, params } = useNavigationContext();

  switch (currentView) {
    case NavigationView.Builds:
      return <BuildsDashboard />;
    case NavigationView.BuildDetails:
      return (
        <BuildDetailsProvider buildId={params.buildId}>
          <BuildDetails />
        </BuildDetailsProvider>
      );
    case NavigationView.EncyclopediaEquipment:
      return <SearchEquipments />;
    case NavigationView.CraftManager:
      return <CraftManager />;
    default:
      return null;
  }
};
