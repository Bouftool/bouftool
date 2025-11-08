import CheckIcon from "@mui/icons-material/Check";
import { Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { RarityIcon } from "src/front/components/Wakfu/RarityIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import type { TCraftItem } from "src/wakfu/craftManager/types";
import { useCraftManagerContext } from "../context";
import { extractItemsWithoutRecipe } from "./utils";

export const ShoppingCart = () => {
  const { items, markAllIngredientsById } = useCraftManagerContext();

  const shoppingCartItems = useMemo(() => {
    return extractItemsWithoutRecipe(items);
  }, [items]);

  const totalQuantity = useMemo(() => {
    return shoppingCartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [shoppingCartItems]);

  const handleOpenEncyclopedia = (item: TCraftItem["item"]) => {
    sendElectronEvent(ElectronEvents.OpenWebEncyclopedia, { itemTypeId: item.itemType.id, itemId: item.id });
  };

  const handleOpenOverlay = () => {
    sendElectronEvent(ElectronEvents.CraftManagerOpenOverlay, undefined);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Stack
      sx={{
        flexBasis: "500px",
        gap: 1,
        overflowY: "auto",
        p: 1,
        borderRadius: "8px",
        bgcolor: "surface.100",
      }}
    >
      <Typography variant="subtitle2">
        Ressources ({shoppingCartItems.length} différentes, {totalQuantity} en tout)
      </Typography>
      <Button variant="push" onClick={handleOpenOverlay}>
        Open Overlay
      </Button>
      {shoppingCartItems.map((shoppingItem) => (
        <StackRow
          key={shoppingItem.item.id}
          sx={{ justifyContent: "space-between", bgcolor: "surface.150", p: 0.5, borderRadius: "8px" }}
        >
          <StackRow sx={{ pr: 1 }}>
            <ItemIcon width={30}>{shoppingItem.item.gfxId}</ItemIcon>
            <RarityIcon width={14}>{shoppingItem.item.rarity}</RarityIcon>
            {shoppingItem.item.title.fr} (x{shoppingItem.quantity})
          </StackRow>
          <StackRow sx={{ gap: 0.5 }}>
            <Button
              variant="push"
              onClick={() => markAllIngredientsById(shoppingItem.item.id)}
              sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }}
              title="Marquer tous les ingrédients de ce type comme craftés"
            >
              <CheckIcon fontSize="small" color="success" />
            </Button>
            <Button
              variant="push"
              onClick={() => handleOpenEncyclopedia(shoppingItem.item)}
              sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }}
            >
              <img height={20} src={`wakfu/EncyclopediaIcon.png`} alt="Encyclopedia Icon" />
            </Button>
          </StackRow>
        </StackRow>
      ))}
    </Stack>
  );
};
