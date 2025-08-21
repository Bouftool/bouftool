import { Stack, Typography } from "@mui/material";
import type { ElectronEvents, ElectronEventsRenderer } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { BuildsDashboardCardRoot, buildsDashboardCardClasses } from "./styles";

export type TBuildsDashboardCardProps = {
  build: ElectronEventsRenderer[ElectronEvents.GetAllBuilds][number];
  onClick: () => void;
};

export const BuildsDashboardCard = ({ build, onClick }: TBuildsDashboardCardProps) => {
  return (
    <BuildsDashboardCardRoot className={buildsDashboardCardClasses.root} variant="push" onClick={onClick}>
      <StackRow>
        <BreedFaceIcon className={buildsDashboardCardClasses.breedFace} width={48}>
          {build.breed}
        </BreedFaceIcon>
        <Stack sx={{ alignItems: "start" }}>
          <Typography variant="subtitle2">{build.name}</Typography>
          <Typography variant="caption">Niv. {build.level}</Typography>
        </Stack>
      </StackRow>
      <StackRow>
        {Object.values(WakfuEquipmentPosition).map((position) =>
          position === WakfuEquipmentPosition.Costume ? null : (
            <ItemSlot key={position} position={position} item={build.items[position]} size={48} disableTooltip />
          ),
        )}
      </StackRow>
    </BuildsDashboardCardRoot>
  );
};
