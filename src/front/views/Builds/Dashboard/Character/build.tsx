import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack, Typography } from "@mui/material";
import type { MouseEvent } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { useElectronEvent } from "src/front/hooks/electron";
import { useNavigationContext } from "src/front/views/Navigation";
import { NavigationView } from "src/front/views/Navigation/types";
import type { TWakfuBuildMinimalDisplay } from "src/wakfu/builds/types";
import { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { cardCharacterClasses } from "./styles";

export type TCardCharacterBuildProps = {
  characterId: string;
  build: TWakfuBuildMinimalDisplay;
};

export const CardCharacterBuild = ({ characterId, build }: TCardCharacterBuildProps) => {
  const { setCurrentView } = useNavigationContext();
  const [deleteBuild, _, loading] = useElectronEvent(ElectronEvents.BuildDelete);

  const handleClickBuild = () => {
    setCurrentView(NavigationView.BuildDetails, { buildId: build.id });
  };

  const handleClickDeleteBuild = (evt: MouseEvent) => {
    evt.stopPropagation();
    deleteBuild({ characterId, buildId: build.id });
  };

  return (
    <StackRow key={build.id} className={cardCharacterClasses.build} onClick={handleClickBuild}>
      <Stack>
        <Typography variant="subtitle2">{build.name}</Typography>
        <Typography variant="caption">Niv. {build.level}</Typography>
      </Stack>
      <StackRow flexWrap="wrap">
        {Object.values(EnumWakfuEquipmentPosition).map((position) => (
          <ItemSlot key={position} position={position} item={build.stuff[position]} size={40} disableTooltip />
        ))}
        <Button variant="push" onClick={handleClickDeleteBuild} disabled={loading} loading={loading}>
          <DeleteIcon color="error" />
        </Button>
      </StackRow>
    </StackRow>
  );
};
