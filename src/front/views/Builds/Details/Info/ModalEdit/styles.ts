import { Dialog, dialogTitleClasses, paperClasses, styled } from "@mui/material";

const Prefix = "ModalBuildDetailsInfoEdit";

export const modalBuildDetailsInfoEditClasses = {
  root: `${Prefix}-root`,
  content: `${Prefix}-content`,
  breedButton: `${Prefix}-breedButton`,
};

export const ModalBuildDetailsInfoEditRoot = styled(Dialog)(({ theme }) => ({
  [`&.${modalBuildDetailsInfoEditClasses.root}`]: {
    [`& .${paperClasses.root}`]: {
      borderRadius: "8px",
    },
    [`& .${dialogTitleClasses.root}`]: {
      paddingBottom: theme.spacing(1),
    },
    [`& .${modalBuildDetailsInfoEditClasses.content}`]: {
      paddingTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(1),
    },
    [`& .${modalBuildDetailsInfoEditClasses.breedButton}`]: {
      position: "relative",
      border: `1px solid ${theme.palette.border.light}`,
      borderRadius: "8px",
      overflow: "hidden",
      "&:hover:after": {
        position: "absolute",
        content: '""',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.action.hover,
      },
      "&.Mui-selected": {
        boxShadow: theme.palette.mode === "light" ? `0 0 0 1px black` : `0 0 0 1px white`,
        "&:after": {
          position: "absolute",
          content: '""',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.palette.action.selected,
        },
      },
    },
  },
}));
