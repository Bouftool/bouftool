import { Stack } from "@mui/material";
import { useMemo } from "react";
import type { TCraftItem } from "src/wakfu/craftManager/types";
import { StackRow } from "../../../components/Layout/StackRow";
import { ItemIcon } from "../../../components/Wakfu/ItemIcon";
import { RarityIcon } from "../../../components/Wakfu/RarityIcon";

export type TCraftItemProps = {
  item: TCraftItem;
  path: number[];
};

export const CraftItem = ({ item, path }: TCraftItemProps) => {
  const hasChildren = useMemo(() => {
    return item.item.recipes[0]?.ingredients?.length > 0;
  }, [item.item.recipes]);

  return (
    <Stack
      sx={{
        // border: hasChildren ? "1px solid" : "0px",
        borderColor: "surface.200",
        borderRadius: hasChildren ? "8px" : "0px",
      }}
    >
      <StackRow
        key={item.item.id}
        sx={{
          bgcolor: hasChildren ? "surface.100" : "surface.150",
          borderRadius: hasChildren ? "8px 8px 0px 0px" : "0px",
          px: 1,
          py: 0.5,
          pl: (path.length - 1) * 2,
        }}
      >
        <ItemIcon width={40}>{item.item.gfxId}</ItemIcon>
        <RarityIcon width={12}>{item.item.rarity}</RarityIcon>
        {item.item.title.fr}
      </StackRow>
      {item.item.recipes[0]?.ingredients?.map((ingredient) => (
        <CraftItem key={ingredient.item.id} item={ingredient} path={path.concat([ingredient.item.id])} />
      ))}
    </Stack>
  );
};
