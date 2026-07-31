import { Typography } from "@mui/material";
import { createContext, type ReactNode, useContext, useEffect } from "react";
import { ElectronEvents, type TElectronGetBuildResult } from "src/electron/types";
import { Loading } from "src/front/components/Loading";
import { useElectronEvent } from "src/front/hooks/electron";
import { WakfuLevelsRange } from "src/wakfu/utils/constants";
import { SearchItemsFiltersProvider } from "../../SearchEquipments/contexts/filters";
import { SearchItemsPreferencesProvider } from "../../SearchEquipments/contexts/preferences";

const context = createContext<TElectronGetBuildResult | undefined>(undefined);

export const useOptionalBuildDetailsContext = () => {
  return useContext(context);
};

export const useBuildDetailsContext = () => {
  const contextValue = useContext(context);
  if (!contextValue) {
    throw new Error("useBuildDetailsContext must be used within a BuildDetailsProvider");
  }
  return contextValue;
};

export type TBuildDetailsProviderProps = {
  buildId: string;
  children: ReactNode;
};

export const BuildDetailsProvider = ({ buildId, children }: TBuildDetailsProviderProps) => {
  const [send, response] = useElectronEvent(ElectronEvents.GetBuild);

  useEffect(() => {
    send({ buildId });
  }, [buildId, send]);

  if (response === null) {
    return (
      <Loading>
        <Typography variant="body1">Récupération du build</Typography>
      </Loading>
    );
  }
  const levelsRange = WakfuLevelsRange.find((range) => range.min <= response.level && range.max >= response.level);
  return (
    <SearchItemsFiltersProvider defaultFilters={{ levels: levelsRange ?? { min: 1, max: 245 } }}>
      <SearchItemsPreferencesProvider>
        <context.Provider value={response}>{children}</context.Provider>
      </SearchItemsPreferencesProvider>
    </SearchItemsFiltersProvider>
  );
};
