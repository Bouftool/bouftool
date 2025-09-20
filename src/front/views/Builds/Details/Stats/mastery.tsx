import { EnumWakfuStat } from "src/wakfu/stats/types";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStat } from "./logics";
import { StatsRow, statsRowClasses } from "./styles";

export const BuildDetailsStatsMastery = () => {
  const build = useBuildDetailsContext();
  return (
    <StatsRow columns={4} className={statsRowClasses.root}>
      <BuildStats
        stats={EnumWakfuStat.FireMastery}
        value={getStat(build, EnumWakfuStat.FireMastery).toLocaleString("fr-FR")}
        hideLabel
        statsColor="#DD8231"
      />
      <BuildStats
        stats={EnumWakfuStat.WaterMastery}
        value={getStat(build, EnumWakfuStat.WaterMastery).toLocaleString("fr-FR")}
        hideLabel
        statsColor="#88DBDA"
      />
      <BuildStats
        stats={EnumWakfuStat.EarthMastery}
        value={getStat(build, EnumWakfuStat.EarthMastery).toLocaleString("fr-FR")}
        hideLabel
        statsColor="#A9BE1F"
      />
      <BuildStats
        stats={EnumWakfuStat.AirMastery}
        value={getStat(build, EnumWakfuStat.AirMastery).toLocaleString("fr-FR")}
        hideLabel
        statsColor="#CE87DD"
      />
    </StatsRow>
  );
};
