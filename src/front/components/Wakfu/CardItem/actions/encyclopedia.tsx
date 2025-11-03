import { Button, Tooltip } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { sendElectronEvent } from "src/front/hooks/electron";

export type TSearchItemsEncyclopediaProps = {
  itemId: number;
  itemTypeId: number;
};

export const SearchItemsEncyclopedia = ({ itemId, itemTypeId }: TSearchItemsEncyclopediaProps) => {
  return (
    <Tooltip title="Ouvrir l'encyclopédie" arrow>
      <Button
        variant="push"
        sx={{ minWidth: 0, p: 0, aspectRatio: "1" }}
        onClick={() => sendElectronEvent(ElectronEvents.OpenWebEncyclopedia, { itemTypeId, itemId })}
      >
        <img height={18} src={`wakfu/EncyclopediaIcon.png`} alt="Encyclopedia Icon" />
      </Button>
    </Tooltip>
  );
};
