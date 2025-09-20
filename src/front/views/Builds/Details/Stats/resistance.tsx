import { EnumWakfuStat } from "src/wakfu/stats/types";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getResistanceText, getStat } from "./logics";
import { StatsRow, statsRowClasses } from "./styles";

export const BuildDetailsStatResistance = () => {
  const build = useBuildDetailsContext();

  return (
    <StatsRow columns={4} className={statsRowClasses.root}>
      <BuildStats
        stats={EnumWakfuStat.FireResistance}
        value={getResistanceText(getStat(build, EnumWakfuStat.FireResistance))}
        hideLabel
        statsColor="#DD8231"
      />
      <BuildStats
        stats={EnumWakfuStat.WaterResistance}
        value={getResistanceText(getStat(build, EnumWakfuStat.WaterResistance))}
        hideLabel
        statsColor="#88DBDA"
      />
      <BuildStats
        stats={EnumWakfuStat.EarthResistance}
        value={getResistanceText(getStat(build, EnumWakfuStat.EarthResistance))}
        hideLabel
        statsColor="#A9BE1F"
      />
      <BuildStats
        stats={EnumWakfuStat.AirResistance}
        value={getResistanceText(getStat(build, EnumWakfuStat.AirResistance))}
        hideLabel
        statsColor="#CE87DD"
      />
    </StatsRow>
  );
};
