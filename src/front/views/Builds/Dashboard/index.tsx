import AddIcon from "@mui/icons-material/Add";
import { Button, Stack } from "@mui/material";
import { useLayoutEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { Loading } from "src/front/components/Loading";
import { useElectronEvent } from "src/front/hooks/electron";
import { useNavigationContext } from "../../Navigation";
import { NavigationView } from "../../Navigation/types";
import { BuildsDashboardCard } from "./card";

export const BuildsDashboard = () => {
  const { setCurrentView } = useNavigationContext();
  const [createBuild, response, loading] = useElectronEvent(ElectronEvents.CreateBuild);
  const [getAllBuilds, allBuildsResponse, allBuildsLoading] = useElectronEvent(ElectronEvents.GetAllBuilds);

  const handleCreateBuild = () => {
    createBuild(undefined);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Switch page when buildId received
  useLayoutEffect(() => {
    if (response) {
      setCurrentView(NavigationView.BuildDetails, { buildId: response.buildId });
    }
  }, [response]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only call once
  useLayoutEffect(() => {
    getAllBuilds(undefined);
  }, []);

  return (
    <Stack sx={{ flex: 1, p: 2, gap: 2, overflow: "hidden" }}>
      <StackRow sx={{ justifyContent: "end" }}>
        <Button variant="push" color="primary" startIcon={<AddIcon />} onClick={handleCreateBuild} loading={loading}>
          Nouveau Build
        </Button>
      </StackRow>
      <Stack sx={{ flex: 1, gap: 1, overflow: "auto" }}>
        {!allBuildsResponse || allBuildsLoading ? (
          <Loading>Chargement des builds...</Loading>
        ) : (
          allBuildsResponse.map((build) => (
            <BuildsDashboardCard
              key={build.id}
              build={build}
              onClick={() => setCurrentView(NavigationView.BuildDetails, { buildId: build.id })}
            />
          ))
        )}
      </Stack>
    </Stack>
  );
};
