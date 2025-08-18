import AddIcon from "@mui/icons-material/Add";
import { Button, Stack } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";

export const BuildsDashboard = () => {
  return (
    <Stack sx={{ flex: 1, p: 2 }}>
      <StackRow sx={{ justifyContent: "end" }}>
        <Button variant="push" color="primary" startIcon={<AddIcon />}>
          Nouveau Build
        </Button>
      </StackRow>
    </Stack>
  );
};
