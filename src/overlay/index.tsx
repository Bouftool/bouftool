import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppContainer } from "src/front/components/AppContainer";
import { theme } from "src/front/theme/material";
import { OverlayTopBar } from "./components/TopBar";
import { OverlayShoppingList } from "./ShoppingList";

export const OverlayApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <OverlayTopBar />
        <OverlayShoppingList />
      </AppContainer>
    </ThemeProvider>
  );
};
