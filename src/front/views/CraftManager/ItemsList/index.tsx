import { Stack } from "@mui/material";
import { useCraftManagerContext } from "../context";
import { CraftItem } from "./Item";

export const CraftItemsList = () => {
  const itemsToCraft = useCraftManagerContext();

  if (!itemsToCraft) {
    return null;
  }

  return (
    <Stack sx={{ flexBasis: "500px", borderRadius: "8px", gap: 1, overflowY: "auto" }}>
      {itemsToCraft.map((itemToCraft) => (
        <CraftItem key={itemToCraft.item.id} item={itemToCraft} path={[itemToCraft.item.id]} />
      ))}
    </Stack>
  );
};
