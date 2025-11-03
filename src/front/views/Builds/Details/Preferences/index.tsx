import { Button, Stack } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import { useBuildDetailsContext } from "../context";
import { BuildDetailsPreferencesSortable } from "./sortable";

export const BuildDetailsPreferences = () => {
  const build = useBuildDetailsContext();

  return (
    <Stack sx={{ gap: 1, overflow: "hidden", height: "100%", justifyContent: "space-between" }}>
      <StackRow>
        <StatsIcon>{EnumWakfuStat.ElementalMastery}</StatsIcon>
        <BuildDetailsPreferencesSortable
          value={build.elementalPreferences}
          onChange={(values) =>
            sendElectronEvent(ElectronEvents.BuildSetPreferences, {
              buildId: build.id,
              preferences: values,
            })
          }
        />
      </StackRow>
      {/* <StackRow>
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
      </StackRow> */}
      <StackRow sx={{ justifyContent: "end" }}>
        <Button
          variant="push"
          onClick={() => sendElectronEvent(ElectronEvents.CraftManagerAddBuildItems, { buildId: build.id })}
        >
          Tout crafter
          <img height={22} style={{ paddingLeft: 4 }} src={`wakfu/RecipeIcon.png`} alt="Recipe Icon" />
        </Button>
      </StackRow>
    </Stack>
  );
};
