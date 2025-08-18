import { Box, CssBaseline, Stack, ThemeProvider, Typography } from "@mui/material";
import { useEffect } from "react";
import { type ElectronAPI, ElectronEvents } from "src/electron/types";
import { Loading } from "./components/Loading";
import { useElectronEvent } from "./hooks/electron";
import { theme } from "./theme/material";
import { Navbar } from "./views/Navbar";
import { Navigation, NavigationProvider } from "./views/Navigation";

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export const App = () => {
  const [send, response] = useElectronEvent(ElectronEvents.AppReady);

  useEffect(() => {
    send(undefined);
  }, [send]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          position: "absolute",
          width: "100%",
          height: "100%",
          bgcolor: theme.palette.background.default,
        })}
      >
        {response === null ? (
          <Loading>
            <Typography variant="body1">Loading...</Typography>
          </Loading>
        ) : (
          <NavigationProvider>
            <Stack sx={{ flex: 1, flexDirection: "column", alignItems: "stretch", overflow: "hidden" }}>
              <Navbar />
              <Navigation />
            </Stack>
          </NavigationProvider>
        )}
      </Box>
    </ThemeProvider>
  );
};
