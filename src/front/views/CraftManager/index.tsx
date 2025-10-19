import { Stack } from "@mui/material";
import { CraftManagerContextProvider } from "./context";
import { CraftItemsList } from "./ItemsList";
import { ShoppingCart } from "./ShoppingCart";

export const CraftManager = () => {
  return (
    <Stack sx={{ flex: 1, p: 1, flexDirection: "row", overflow: "hidden", justifyContent: "space-evenly" }}>
      <CraftManagerContextProvider>
        <CraftItemsList />
        <ShoppingCart />
      </CraftManagerContextProvider>
    </Stack>
  );
};
