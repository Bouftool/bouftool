import { Stack } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { EnumAbilitiesCategories } from "src/wakfu/abilities/abilities";
import { useBuildDetailsContext } from "../context";
import { BuildAbilitiesCode } from "./abilitiesCode";
import { AbilitiesCategory } from "./Category";

export const BuildAbilities = () => {
  const build = useBuildDetailsContext();

  return (
    <Stack
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        flexDirection: "column",
      }}
    >
      <BuildAbilitiesCode />
      <Stack sx={{ alignSelf: "stretch", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
        <StackGrid columns={2} gap={2} p={2} sx={{ flex: 1, maxWidth: 800 }}>
          <Stack sx={{ gap: 1 }}>
            <AbilitiesCategory category={EnumAbilitiesCategories.Intelligence} level={build.level} />
            <AbilitiesCategory category={EnumAbilitiesCategories.Strength} level={build.level} />
            <AbilitiesCategory category={EnumAbilitiesCategories.Agility} level={build.level} />
          </Stack>
          <Stack sx={{ gap: 1 }}>
            <AbilitiesCategory category={EnumAbilitiesCategories.Chance} level={build.level} />
            <AbilitiesCategory category={EnumAbilitiesCategories.Major} level={build.level} />
          </Stack>
        </StackGrid>
      </Stack>
    </Stack>
  );
};
