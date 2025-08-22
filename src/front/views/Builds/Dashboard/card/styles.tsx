import { Button, styled } from "@mui/material";

const Prefix = "BuildsDashboardCard";

export const buildsDashboardCardClasses = {
  root: `${Prefix}-root`,
  breedFace: `${Prefix}-breedFace`,
  content: `${Prefix}-content`,
};

export const BuildsDashboardCardRoot = styled(Button)(({ theme }) => ({
  [`&.${buildsDashboardCardClasses.root}`]: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(1),
    alignItems: "center",
    gap: theme.spacing(1),
    justifyContent: "space-between",
    [`& .${buildsDashboardCardClasses.breedFace}`]: {
      borderRadius: "8px",
      border: `1px solid ${theme.palette.border.light}`,
    },
  },
}));
