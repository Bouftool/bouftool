import DeleteIcon from "@mui/icons-material/Delete";
import { Button, ButtonGroup, buttonClasses, Stack, Typography } from "@mui/material";
import { ElectronEvents, type ElectronEventsRenderer } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { useModalConfirmationContext } from "src/front/components/Modal/Confirmation";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { useElectronEvent } from "src/front/hooks/electron";
import { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { BuildsDashboardCardRoot, buildsDashboardCardClasses } from "./styles";

export type TBuildsDashboardCardProps = {
  build: ElectronEventsRenderer[ElectronEvents.GetAllBuilds][number];
  onClick: () => void;
};

export const BuildsDashboardCard = ({ build, onClick }: TBuildsDashboardCardProps) => {
  const [deleteBuild, , loading] = useElectronEvent(ElectronEvents.BuildDelete);
  const confirm = useModalConfirmationContext();

  return (
    <ButtonGroup
      variant="push"
      sx={{
        borderRadius: "8px",
        [`& .${buttonClasses.root}:first-of-type`]: {
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
        },
        [`& .${buttonClasses.root}:last-of-type`]: {
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
        },
      }}
    >
      <BuildsDashboardCardRoot className={buildsDashboardCardClasses.root} variant="push" onClick={onClick}>
        <StackRow>
          <BreedFaceIcon className={buildsDashboardCardClasses.breedFace} width={48}>
            {build.breed}
          </BreedFaceIcon>
          <Stack sx={{ alignItems: "start", minWidth: 100, overflow: "hidden" }}>
            <Typography variant="subtitle2" sx={{ maxWidth: "100%" }} noWrap>
              {build.name}
            </Typography>
            <Typography variant="caption">Niv. {build.level}</Typography>
          </Stack>
        </StackRow>
        <StackRow flexWrap="wrap">
          {Object.values(WakfuEquipmentPosition).map((position) =>
            position === WakfuEquipmentPosition.Costume ? null : (
              <ItemSlot key={position} position={position} item={build.items[position]} size={48} disableTooltip />
            ),
          )}
        </StackRow>
      </BuildsDashboardCardRoot>
      <Button
        variant="push"
        onClick={async () => {
          console.log("CLICK");
          if (await confirm("Confirmer la suppression", "Êtes-vous sûr de vouloir supprimer ce build ?")) {
            deleteBuild({ buildId: build.id });
          }
        }}
        loading={loading}
      >
        <DeleteIcon color="error" />
      </Button>
    </ButtonGroup>
  );
};
