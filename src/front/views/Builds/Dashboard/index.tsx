import { Stack } from "@mui/material";
import { useLayoutEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { Loading } from "src/front/components/Loading";
import { useElectronEvent } from "src/front/hooks/electron";
import { ButtonCreateCharacter } from "./buttonCreateCharacter";
import { Character } from "./Character";
import { ModalEditCharacterProvider } from "./ModalEditCharacter/context";

export const BuildsDashboard = () => {
  const [getAllBuilds, allBuildsResponse, allBuildsLoading] = useElectronEvent(ElectronEvents.GetAllBuilds);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only call once
  useLayoutEffect(() => {
    getAllBuilds(undefined);
  }, []);

  return (
    <ModalEditCharacterProvider>
      <Stack sx={{ flex: 1, p: 2, gap: 2, overflow: "hidden" }}>
        <StackRow sx={{ justifyContent: "end" }}>
          <ButtonCreateCharacter />
        </StackRow>
        <Stack sx={{ flex: 1, gap: 1, overflow: "auto" }}>
          {!allBuildsResponse || allBuildsLoading ? (
            <Loading>Chargement des builds...</Loading>
          ) : (
            allBuildsResponse.flatMap((character) => <Character key={character.id} character={character} />)
          )}
        </Stack>
      </Stack>
    </ModalEditCharacterProvider>
  );
};
