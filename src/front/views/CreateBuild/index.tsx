import { Stack, Typography } from "@mui/material";

export const CreateBuild = () => {
  return (
    <Stack sx={{ flex: 1, alignItems: "center" }}>
      <Stack sx={{ flex: "0 1 400px", bgcolor: "grey.900", borderRadius: 2, p: 1 }}>
        <Typography variant="subtitle1">Nouveau Build</Typography>
      </Stack>
    </Stack>
  );
};
