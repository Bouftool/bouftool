import { LinearProgress, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export type LoadingProps = {
  children: ReactNode;
};

export const Loading = ({ children }: LoadingProps) => {
  return (
    <Stack
      sx={{
        flex: 1,
        alignSelf: "center",
        flexDirection: "column",
        justifyContent: "center",
        gap: 1,
        width: "300px",
      }}
    >
      <LinearProgress variant={"indeterminate"} />
      <Typography variant="body1" sx={{ alignSelf: "center" }}>
        {children}
      </Typography>
    </Stack>
  );
};
