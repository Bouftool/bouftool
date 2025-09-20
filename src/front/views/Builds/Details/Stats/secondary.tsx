import { Stack } from "@mui/material";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStat, getStatsColor } from "./logics";
import { StatsPanel, statsPanelClasses } from "./styles";

export const BuildDetailsStatsSecondary = () => {
  const build = useBuildDetailsContext();

  return (
    <StatsPanel className={statsPanelClasses.root} columns={2}>
      <Stack className={statsPanelClasses.column}>
        <BuildStats
          stats={EnumWakfuStat.CriticalMastery}
          value={getStat(build, EnumWakfuStat.CriticalMastery).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.CriticalMastery))}
        />
        <BuildStats
          stats={EnumWakfuStat.RearMastery}
          value={getStat(build, EnumWakfuStat.RearMastery).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.RearMastery))}
        />
        <BuildStats
          stats={EnumWakfuStat.MeleeMastery}
          value={getStat(build, EnumWakfuStat.MeleeMastery).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.MeleeMastery))}
        />
        <BuildStats
          stats={EnumWakfuStat.DistanceMastery}
          value={getStat(build, EnumWakfuStat.DistanceMastery).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.DistanceMastery))}
        />
        <BuildStats
          stats={EnumWakfuStat.HealingMastery}
          value={getStat(build, EnumWakfuStat.HealingMastery).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.HealingMastery))}
        />
        <BuildStats
          stats={EnumWakfuStat.BerserkMastery}
          value={getStat(build, EnumWakfuStat.BerserkMastery).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.BerserkMastery))}
        />
      </Stack>
      <Stack className={statsPanelClasses.column}>
        <BuildStats
          stats={EnumWakfuStat.CriticalResistance}
          value={getStat(build, EnumWakfuStat.CriticalResistance).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.CriticalResistance))}
        />
        <BuildStats
          stats={EnumWakfuStat.RearResistance}
          value={getStat(build, EnumWakfuStat.RearResistance).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.RearResistance))}
        />
        <BuildStats
          stats={EnumWakfuStat.ArmorGiven}
          value={`${getStat(build, EnumWakfuStat.ArmorGiven)}%`}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.ArmorGiven), true)}
        />
        <BuildStats
          stats={EnumWakfuStat.ArmorReceived}
          value={`${getStat(build, EnumWakfuStat.ArmorReceived)}%`}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.ArmorReceived), true)}
        />
        <BuildStats
          stats={EnumWakfuStat.HealingReceived}
          value={`${getStat(build, EnumWakfuStat.HealingReceived)}%`}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.HealingReceived), true)}
        />
        <BuildStats
          stats={EnumWakfuStat.IndirectDamages}
          value={`${getStat(build, EnumWakfuStat.IndirectDamages)}%`}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.IndirectDamages), true)}
        />
      </Stack>
    </StatsPanel>
  );
};
