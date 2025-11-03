import { Stack, Typography } from "@mui/material";
import { TreeView } from "../../../components/TreeView";
import { useCraftManagerContext } from "../context";
import { RecipeSelectionModal } from "../ItemsList/RecipeSelectionModal";

export const CraftItemsList = () => {
  const { treeNodes, recipeCraftItem, currentRecipeIndex, onSelectRecipe, onCloseRecipeModal } =
    useCraftManagerContext();

  if (treeNodes.length === 0) {
    return (
      <Stack
        sx={{
          flexBasis: "500px",
          p: 2,
          alignSelf: "center",
          alignItems: "center",
          borderRadius: "8px",
          bgcolor: "surface.150",
        }}
      >
        <Typography variant="h6">Aucun objet dans la liste de craft</Typography>
        <br />
        <Typography variant="body1">
          Pour ajouter un objet, vous pouvez cliquer sur le marteau situé sur sa carte, puis sur le bouton « crafter »
        </Typography>
        <br />
        <Typography variant="body1">
          Vous pouvez aussi ajouter tout les items craftable de votre build en cliquant sur ...
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack sx={{ flexBasis: "500px", borderRadius: "8px", bgcolor: "surface.100", overflowY: "auto" }}>
      <Typography variant="subtitle2" sx={{ px: 1, pt: 1 }}>
        Items à crafter
      </Typography>
      <TreeView nodes={treeNodes} />
      <RecipeSelectionModal
        craftItem={recipeCraftItem}
        currentRecipeIndex={currentRecipeIndex}
        onSelectRecipe={onSelectRecipe}
        onClose={onCloseRecipeModal}
      />
    </Stack>
  );
};
