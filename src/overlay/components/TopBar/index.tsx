import ClearIcon from "@mui/icons-material/Clear";
import { Button, Stack } from "@mui/material";
import { useLayoutEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { sendElectronEvent, useElectronEvent } from "src/front/hooks/electron";

export const OverlayTopBar = () => {
  const [getOverlayMode, overlayMode] = useElectronEvent(ElectronEvents.CraftManagerGetOverlayMode);

  // biome-ignore lint/correctness/useExhaustiveDependencies: load one time
  useLayoutEffect(() => {
    getOverlayMode(undefined);
  }, []);

  const handleClose = () => {
    sendElectronEvent(ElectronEvents.CraftManagerCloseOverlay, undefined);
  };

  if (overlayMode) {
    return null;
  }

  return (
    <StackRow sx={{ width: "100%" }}>
      <Stack
        sx={{
          flexGrow: 1,
          height: 32,
          justifyContent: "center",
          alignItems: "end",
          WebkitAppRegion: "drag",
        }}
      />
      <StackRow>
        <Button variant="text" color="error" sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }} onClick={handleClose}>
          <ClearIcon />
        </Button>
      </StackRow>
    </StackRow>
  );
};
