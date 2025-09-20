import { Typography } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { RarityIcon } from "src/front/components/Wakfu/RarityIcon";
import type { WakfuRecipe } from "src/wakfu/recipes/recipe";
import { RecipeIngredientEncyclopedia } from "./encyclopedia";

export type TRecipeIngredientProps = {
  ingredient: ReturnType<WakfuRecipe["toObject"]>["ingredients"][number];
};

export const RecipeIngredient = ({ ingredient }: TRecipeIngredientProps) => {
  return (
    <StackRow
      sx={{
        border: (theme) => `1px solid ${theme.palette.border.main}`,
        borderTopWidth: "0px",
        borderBottomWidth: "0px",
        py: 0.5,
        px: 1,
        justifyContent: "space-between",
        "&:first-of-type": {
          borderTopWidth: "1px",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        },
        "&:last-of-type": {
          borderBottomWidth: "1px",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        },
        "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
        "&:nth-of-type(2n)": { bgcolor: "surface.250" },
      }}
    >
      <StackRow>
        <ItemIcon width={24}>{ingredient.item.gfxId}</ItemIcon>
        <RarityIcon width={10}>{ingredient.item.rarity}</RarityIcon>
        <Typography variant="body2">
          x{ingredient.quantity} {ingredient.item.title.fr}
        </Typography>
      </StackRow>
      <StackRow>
        <RecipeIngredientEncyclopedia itemId={ingredient.item.id} itemTypeId={ingredient.item.itemType.id} />
      </StackRow>
    </StackRow>
  );
};
