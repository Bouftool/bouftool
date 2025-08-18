import { Alert, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export type FatalErrorProps = {
  children: ReactNode;
};

export const FatalError = () => {
  return (
    <Stack sx={{ flex: 1, alignSelf: "center", justifyContent: "center" }}>
      <Alert severity="error">
        <Typography variant="h6">Une erreur critique est survenue.</Typography>
        <Typography variant="body2"></Typography>
        <Typography variant="body1">
          Veuillez redémarrer l'application. Si le problème persiste, veuillez contacter le support.
        </Typography>
      </Alert>
    </Stack>
  );
};
