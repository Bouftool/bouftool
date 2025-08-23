import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStatsColor } from "./logics";
import { StatsRow, statsRowClasses } from "./styles";

export const BuildDetailsAdditionalStats = () => {
  const build = useBuildDetailsContext();
  const cumulatedMastery =
    Math.max(
      build.stats[WakfuStats.MasteryFire],
      build.stats[WakfuStats.MasteryWater],
      build.stats[WakfuStats.MasteryEarth],
      build.stats[WakfuStats.MasteryAir],
    ) +
    Math.max(build.stats[WakfuStats.MeleeMastery], build.stats[WakfuStats.DistanceMastery]) +
    build.stats[WakfuStats.CriticalMastery] +
    build.stats[WakfuStats.BackMastery] +
    build.stats[WakfuStats.BerserkMastery];

  return (
    <StatsRow columns={2} className={statsRowClasses.root}>
      <BuildStats
        stats={WakfuStats.Armor}
        value={build.stats[WakfuStats.Armor].toLocaleString("fr-FR")}
        statsColor="#218246"
      />
      <BuildStats
        stats={WakfuStats.Mastery}
        label="Maîtrise cumulée"
        value={cumulatedMastery.toLocaleString("fr-FR")}
        statsColor={getStatsColor(cumulatedMastery)}
      />
    </StatsRow>
  );
};
