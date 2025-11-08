import CheckIcon from "@mui/icons-material/Check";
import { Button, Slider, Stack, Typography, useColorScheme } from "@mui/material";
import { useLayoutEffect, useMemo } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { RarityIcon } from "src/front/components/Wakfu/RarityIcon";
import { sendElectronEvent, useElectronEvent } from "src/front/hooks/electron";
import { extractItemsWithoutRecipe } from "src/front/views/CraftManager/ShoppingCart/utils";
import type { TCraftItem } from "src/wakfu/craftManager/types";

export const OverlayShoppingList = () => {
  const { setMode } = useColorScheme();

  const [getItems, items] = useElectronEvent(ElectronEvents.CraftManagerGetItems);
  const [getOverlayMode, overlayMode] = useElectronEvent(ElectronEvents.CraftManagerGetOverlayMode);

  // biome-ignore lint/correctness/useExhaustiveDependencies: load one time
  useLayoutEffect(() => {
    getItems(undefined);
    getOverlayMode(undefined);
  }, []);

  useLayoutEffect(() => {
    setMode("dark");
  }, [setMode]);

  const shoppingCartItems = useMemo(() => {
    if (!items) {
      return [];
    }
    return extractItemsWithoutRecipe(items);
  }, [items]);

  const totalQuantity = useMemo(() => {
    return shoppingCartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [shoppingCartItems]);

  const handleOpenEncyclopedia = (item: TCraftItem["item"]) => {
    sendElectronEvent(ElectronEvents.OpenWebEncyclopedia, { itemTypeId: item.itemType.id, itemId: item.id });
  };

  const handleMarkAllIngredients = (ingredientId: number) => {
    sendElectronEvent(ElectronEvents.CraftManagerMarkAllIngredientsById, { ingredientId });
    getItems(undefined);
  };

  const handleSetOpacity = (opacity: number) => {
    sendElectronEvent(ElectronEvents.CraftManagerSetOverlayOpacity, { opacity });
  };

  return (
    <Stack
      sx={{
        overflow: "hidden",
        p: 1,
        borderRadius: "8px",
        bgcolor: "surface.100",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!overlayMode && (
        <Slider
          sx={{ width: "80%" }}
          size="medium"
          defaultValue={1}
          min={0.4}
          max={1}
          step={0.01}
          onChange={(_e, value) => handleSetOpacity(value)}
        />
      )}
      {/* <Button variant="push" onClick={handleOpenOverlay}>
          Open Overlay
          </Button> */}
      <Stack sx={{ gap: 1, overflowY: "auto" }}>
        <Typography variant="subtitle2">
          Ressources ({shoppingCartItems.length} différentes, {totalQuantity} en tout)
        </Typography>
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
            {!overlayMode && (
              <StackRow sx={{ gap: 0.5 }}>
                <Button
                  variant="push"
                  onClick={() => handleMarkAllIngredients(shoppingItem.item.id)}
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
            )}
          </StackRow>
        ))}
      </Stack>
    </Stack>
  );
};
