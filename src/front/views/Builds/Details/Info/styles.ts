import { ButtonBase, styled } from "@mui/material";

const Prefix = "BuildDetailsInfo";

export const buildDetailsInfoClasses = {
  root: `${Prefix}-root`,
  breed: `${Prefix}-breed`,
};

export const BuildDetailsInfoRoot = styled(ButtonBase)(({ theme }) => ({
  [`&.${buildDetailsInfoClasses.root}`]: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: theme.palette.surface[100],
    borderRadius: "8px",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    gap: theme.spacing(1),
    "&:hover:after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.action.hover,
    },
  },
  [`& .${buildDetailsInfoClasses.breed}`]: {
    flex: "0 0 auto",
    border: `1px solid ${theme.palette.border.light}`,
    borderRadius: "8px",
  },
}));
