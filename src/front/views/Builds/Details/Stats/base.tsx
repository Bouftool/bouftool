import { Stack } from "@mui/material";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { StatsRow, statsRowClasses } from "./styles";

export const BuildDetailsStatsBase = () => {
  const build = useBuildDetailsContext();

  return (
    <Stack sx={{ gap: 1 }}>
      <StatsRow columns={4} className={statsRowClasses.root}>
        <BuildStats
          stats={WakfuStats.PV}
          value={build.stats[WakfuStats.PV].toLocaleString("fr-FR")}
          statsColor="#E34A53"
        />
        <BuildStats
          stats={WakfuStats.PA}
          value={build.stats[WakfuStats.PA].toLocaleString("fr-FR")}
          statsColor="#19ADD5"
        />
        <BuildStats
          stats={WakfuStats.PM}
          value={build.stats[WakfuStats.PM].toLocaleString("fr-FR")}
          statsColor="#96B443"
        />
        <BuildStats
          stats={WakfuStats.PW}
          value={build.stats[WakfuStats.PW].toLocaleString("fr-FR")}
          statsColor="#32D4CA"
        />
      </StatsRow>
    </Stack>
  );
};
