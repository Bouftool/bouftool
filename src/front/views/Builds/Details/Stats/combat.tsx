import { Stack } from "@mui/material";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStat, getStatsColor } from "./logics";
import { StatsPanel, statsPanelClasses } from "./styles";

export const BuildDetailsStatsCombat = () => {
  const build = useBuildDetailsContext();

  return (
    <StatsPanel className={statsPanelClasses.root} columns={2}>
      <Stack className={statsPanelClasses.column}>
        <BuildStats
          stats={EnumWakfuStat.DamageDealt}
          value={`${getStat(build, EnumWakfuStat.DamageDealt)}%`}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.DamageDealt), true)}
        />
        <BuildStats
          stats={EnumWakfuStat.CriticalHit}
          value={`${getStat(build, EnumWakfuStat.CriticalHit)}%`}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.CriticalHit), true)}
        />
        <BuildStats
          stats={EnumWakfuStat.Initiative}
          value={getStat(build, EnumWakfuStat.Initiative).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.Initiative))}
        />
        <BuildStats
          stats={EnumWakfuStat.Dodge}
          value={getStat(build, EnumWakfuStat.Dodge).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.Dodge))}
        />
        <BuildStats
          stats={EnumWakfuStat.Wisdom}
          value={getStat(build, EnumWakfuStat.Wisdom).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.Wisdom))}
        />
        <BuildStats
          stats={EnumWakfuStat.Control}
          value={getStat(build, EnumWakfuStat.Control).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.Control))}
        />
      </Stack>
      <Stack className={statsPanelClasses.column}>
        <BuildStats
          stats={EnumWakfuStat.HealingDone}
          value={`${getStat(build, EnumWakfuStat.HealingDone)}%`}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.HealingDone), true)}
        />
        <BuildStats
          stats={EnumWakfuStat.Block}
          value={`${getStat(build, EnumWakfuStat.Block)}%`}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.Block), true)}
        />
        <BuildStats
          stats={EnumWakfuStat.Range}
          value={getStat(build, EnumWakfuStat.Range).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.Range))}
        />
        <BuildStats
          stats={EnumWakfuStat.Lock}
          value={getStat(build, EnumWakfuStat.Lock).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.Lock))}
        />
        <BuildStats
          stats={EnumWakfuStat.Prospecting}
          value={getStat(build, EnumWakfuStat.Prospecting).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.Prospecting))}
        />
        <BuildStats
          stats={EnumWakfuStat.Willpower}
          value={getStat(build, EnumWakfuStat.Willpower).toLocaleString("fr-FR")}
          statsColor={getStatsColor(getStat(build, EnumWakfuStat.Willpower))}
        />
      </Stack>
    </StatsPanel>
  );
};
