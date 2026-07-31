import { Alert, Stack, Typography } from "@mui/material";
export const FatalError = () => {
  return (
    <Stack sx={{ flex: 1, alignSelf: "center", justifyContent: "center" }}>
      <Alert severity="error">
        <Typography variant="h6">Une erreur critique est survenue.</Typography>
        <Typography variant="body1">
          Veuillez redémarrer l'application. Si le problème persiste, veuillez contacter le support.
        </Typography>
      </Alert>
    </Stack>
  );
};
