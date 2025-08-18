import { Box, inputClasses, styled } from "@mui/material";

const PREFIX = "RangeFields";

export const rangeFieldsClasses = {
  root: `${PREFIX}-root`,
  notchedOutline: `${PREFIX}-notchedOutline`,
};

export const RangeFieldsControl = styled(Box, { shouldForwardProp: (prop) => prop !== "focused" })<{
  focused: boolean;
}>(({ theme, focused }) => ({
  [`&.${rangeFieldsClasses.root}`]: {
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: "1.4375em",
    letterSpacing: "0.00938em",
    color: "#fff",
    boxSizing: "border-box",
    cursor: "text",
    display: "inline-flex",
    alignItems: "center",
    position: "relative",
    borderRadius: "4px",
    padding: "8.5px 0px",
    [`&:hover .${rangeFieldsClasses.notchedOutline}`]: {
      ...(!focused && {
        borderColor: "white",
      }),
    },
    [`& .${inputClasses.input}`]: {
      padding: "0 14px",
    },
  },
  [`& .${rangeFieldsClasses.notchedOutline}`]: {
    textAlign: "left",
    position: "absolute",
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    margin: 0,
    padding: "0 8px",
    pointerEvents: "none",
    borderRadius: "inherit",
    borderStyle: "solid",
    borderWidth: "1px",
    overflow: "hidden",
    minWidth: 0,
    borderColor: "rgba(255, 255, 255, 0.23)",
    ...(focused && {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
    }),
  },
}));
