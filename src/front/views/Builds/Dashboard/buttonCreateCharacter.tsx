import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { sendElectronEvent } from "src/front/hooks/electron";
import { useNavigationContext } from "src/front/views/Navigation";
import { NavigationView } from "src/front/views/Navigation/types";
import type { EnumWakfuBreed } from "src/wakfu/breed/types";
import { useModalEditCharacterContext } from "./ModalEditCharacter/context";

export const ButtonCreateCharacter = () => {
  const { setCurrentView } = useNavigationContext();
  const openEditCharacterModal = useModalEditCharacterContext();

  const handleSubmit = async (name: string, breed: EnumWakfuBreed) => {
    const characterResponse = await sendElectronEvent(ElectronEvents.BuildCreateCharacter, { name, breed });
    const buildResponse = await sendElectronEvent(ElectronEvents.BuildCreate, {
      characterId: characterResponse.characterId,
    });
    setCurrentView(NavigationView.BuildDetails, { buildId: buildResponse.buildId });
  };

  const handleClick = () => {
    openEditCharacterModal({
      open: true,
      character: null,
      onSubmit: handleSubmit,
    });
  };

  return (
    <Button variant="push" onClick={handleClick} startIcon={<AddIcon />}>
      Nouveau Personnage
    </Button>
  );
};
