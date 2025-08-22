import { Stack } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildDetailsPreferencesSortable } from "./sortable";

export const BuildDetailsPreferences = () => {
  const build = useBuildDetailsContext();

  return (
    <Stack sx={{ gap: 1 }}>
      <StackRow>
        <StatsIcon>{WakfuStats.Mastery}</StatsIcon>
        <BuildDetailsPreferencesSortable
          value={build.preferences.mastery}
          onChange={(values) =>
            sendElectronEvent(ElectronEvents.BuildSetPreferences, {
              buildId: build.id,
              preferences: { mastery: values },
            })
          }
        />
      </StackRow>
      <StackRow>
        <StatsIcon>{WakfuStats.Resistance}</StatsIcon>
        <BuildDetailsPreferencesSortable
          value={build.preferences.resistance}
          onChange={(values) =>
            sendElectronEvent(ElectronEvents.BuildSetPreferences, {
              buildId: build.id,
              preferences: { resistance: values },
            })
          }
        />
      </StackRow>
    </Stack>
  );
};
