import { Stack } from "@mui/material";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStat } from "./logics";
import { StatsRow, statsRowClasses } from "./styles";

export const BuildDetailsStatsBase = () => {
  const build = useBuildDetailsContext();

  return (
    <Stack sx={{ gap: 1 }}>
      <StatsRow columns={4} className={statsRowClasses.root}>
        <BuildStats
          stats={EnumWakfuStat.HealthPoint}
          value={getStat(build, EnumWakfuStat.HealthPoint).toLocaleString("fr-FR")}
          statsColor="#E34A53"
        />
        <BuildStats
          stats={EnumWakfuStat.ActionPoint}
          value={getStat(build, EnumWakfuStat.ActionPoint).toLocaleString("fr-FR")}
          statsColor="#19ADD5"
        />
        <BuildStats
          stats={EnumWakfuStat.MovementPoint}
          value={getStat(build, EnumWakfuStat.MovementPoint).toLocaleString("fr-FR")}
          statsColor="#96B443"
        />
        <BuildStats
          stats={EnumWakfuStat.WakfuPoint}
          value={getStat(build, EnumWakfuStat.WakfuPoint).toLocaleString("fr-FR")}
          statsColor="#32D4CA"
        />
      </StatsRow>
    </Stack>
  );
};
