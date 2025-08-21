import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, OutlinedInput, Stack, Typography } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { StackRow } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { WakfuStats } from "src/wakfu/types/action";

type TBuildAbilitiesLineProps = {
  icon: WakfuStats;
  label: string;
  value: number;
};

const BuildAbilitiesLine = ({ icon, label, value }: TBuildAbilitiesLineProps) => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        justifyContent: "space-between",
        "&:first-of-type": {
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        },
        "&:last-of-type": {
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        },
        "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
        "&:nth-of-type(2n)": { bgcolor: "surface.250" },
        px: 1,
        py: 0.5,
      }}
    >
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <StatsIcon>{icon}</StatsIcon>
        <Typography variant="caption">{label}</Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <Button variant="push" size="small" sx={{ aspectRatio: "1", minWidth: 0, p: 0.25 }}>
          <RemoveIcon fontSize="small" />
        </Button>
        <OutlinedInput
          value={value}
          size="small"
          sx={{ width: "40px", bgcolor: "black", "& input": { py: 0.25, px: 0.5, fontSize: "15px" } }}
        />
        <Button variant="push" size="small" sx={{ aspectRatio: "1", minWidth: 0, p: 0.25 }}>
          <AddIcon fontSize="small" />
        </Button>
      </Stack>
    </Stack>
  );
};

export const BuildAbilities = () => {
  return (
    <Stack
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        flexDirection: "row",
      }}
    >
      <StackGrid columns={2} gap={2} p={2} sx={{ flex: 1, maxWidth: "800px" }}>
        <Stack sx={{ gap: 1 }}>
          <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Intelligence</Typography>
            <StackRow sx={{ pr: "42px" }}>
              <Typography variant="subtitle2">Restants</Typography>
              <Stack sx={{ borderRadius: "8px", px: 1, py: 0.5, bgcolor: "surface.150", width: "38px" }}>
                <Typography variant="subtitle2">0</Typography>
              </Stack>
            </StackRow>
          </Stack>
          <Stack>
            <BuildAbilitiesLine icon={WakfuStats.FinalHealing} label="% Points de vie" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.Resistance} label="Résistance élémentaire" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.FinalHealing} label="Barrière" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.HealingReceived} label="% Soins reçu" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.Armor} label="% Points de vie en armure" value={100} />
          </Stack>
          <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Force</Typography>
            <StackRow sx={{ pr: "42px" }}>
              <Typography variant="subtitle2">Restants</Typography>
              <Stack sx={{ borderRadius: "8px", px: 1, py: 0.5, bgcolor: "surface.150", width: "38px" }}>
                <Typography variant="subtitle2">0</Typography>
              </Stack>
            </StackRow>
          </Stack>
          <Stack>
            <BuildAbilitiesLine icon={WakfuStats.Mastery} label="Maîtrise élémentaire" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.MeleeMastery} label="Maîtrise mêlée" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.DistanceMastery} label="Maîtrise distance" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.PV} label="Points de vie" value={100} />
          </Stack>
          <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Agilité</Typography>
            <StackRow sx={{ pr: "42px" }}>
              <Typography variant="subtitle2">Restants</Typography>
              <Stack sx={{ borderRadius: "8px", px: 1, py: 0.5, bgcolor: "surface.150", width: "38px" }}>
                <Typography variant="subtitle2">0</Typography>
              </Stack>
            </StackRow>
          </Stack>
          <Stack>
            <BuildAbilitiesLine icon={WakfuStats.Lock} label="Tacle" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.Dodge} label="Esquive" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.Initiative} label="Initiative" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.Dodge} label="Tacle et esquive" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.Willpower} label="Volonté" value={100} />
          </Stack>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Chance</Typography>
            <StackRow sx={{ pr: "42px" }}>
              <Typography variant="subtitle2">Restants</Typography>
              <Stack sx={{ borderRadius: "8px", px: 1, py: 0.5, bgcolor: "surface.150", width: "38px" }}>
                <Typography variant="subtitle2">0</Typography>
              </Stack>
            </StackRow>
          </Stack>
          <Stack>
            <BuildAbilitiesLine icon={WakfuStats.CriticalRate} label="% Coup critique" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.Block} label="% Parade" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.CriticalMastery} label="Maîtrise critique" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.BackMastery} label="Maîtrise dos" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.BerserkMastery} label="Maîtrise berserk (PV < 50%)" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.HealingMastery} label="Maîtrise soin" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.BackResistance} label="Résistance dos" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.CriticalResistance} label="Résistance critique" value={100} />
          </Stack>
          <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Majeur</Typography>
            <StackRow sx={{ pr: "42px" }}>
              <Typography variant="subtitle2">Restants</Typography>
              <Stack sx={{ borderRadius: "8px", px: 1, py: 0.5, bgcolor: "surface.150", width: "38px" }}>
                <Typography variant="subtitle2">0</Typography>
              </Stack>
            </StackRow>
          </Stack>
          <Stack>
            <BuildAbilitiesLine icon={WakfuStats.PA} label="Point d'action" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.PM} label="Point de mouvement et dégâts" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.Range} label="Portée et dégâts" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.PW} label="Point de Wakfu" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.Control} label="Contrôle et dégâts" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.FinalDamage} label="% Dommages infligés" value={100} />
            <BuildAbilitiesLine icon={WakfuStats.Resistance} label="Résistance élémentaire" value={100} />
          </Stack>
        </Stack>
      </StackGrid>
    </Stack>
  );
};
