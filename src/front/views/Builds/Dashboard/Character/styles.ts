import { buttonBaseClasses, styled } from "@mui/material";

const Prefix = "CardCharacter";

export const cardCharacterClasses = {
  root: `${Prefix}-root`,
  character: `${Prefix}-character`,
  breed: `${Prefix}-breed`,
  build: `${Prefix}-build`,
};

export const CardCharacterRoot = styled("div")(({ theme }) => ({
  [`&.${cardCharacterClasses.root}`]: {
    [`& .${cardCharacterClasses.character}`]: {
      backgroundColor: theme.palette.surface[100],
      border: `1px solid ${theme.palette.border.main}`,
      borderRadius: "8px",
      borderBottomRightRadius: 0,
      justifyContent: "space-between",
      padding: theme.spacing(1),
    },
    [`& .${cardCharacterClasses.breed}`]: {
      border: `1px solid ${theme.palette.border.light}`,
      borderRadius: "8px",
      height: 48,
      width: 48,
    },
    [`& .${cardCharacterClasses.build}`]: {
      backgroundColor: theme.palette.surface[100],
      border: `1px solid ${theme.palette.border.main}`,
      borderBottomWidth: 0,
      justifyContent: "space-between",
      marginLeft: `calc(48px + ${theme.spacing(1)})`,
      padding: theme.spacing(1),
      position: "relative",
      "&:first-of-type": {
        borderTop: "none",
      },
      "&:last-of-type": {
        borderBottomWidth: 1,
        borderRadius: "0 0 8px 8px",
      },
      [`&:hover:not(:has(.${buttonBaseClasses.root}:hover))`]: {
        backgroundColor: `color-mix(in srgb, ${theme.palette.surface[100]}, ${theme.palette.action.hover})`,
        cursor: "pointer",
      },
    },
  },
}));
