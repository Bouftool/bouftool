import { Stack, type StackProps, styled } from "@mui/material";
import clsx from "clsx";

const prefix = "StackRow";

export const stackRowClasses = {
  root: `${prefix}-root`,
};

export const StackRowRoot = styled(Stack)(({ theme }) => ({
  [`&.${stackRowClasses.root}`]: {
    flexDirection: "row",
    gap: theme.spacing(1),
    alignItems: "center",
  },
}));

export const StackRow = (props: StackProps) => {
  return <StackRowRoot {...props} className={clsx(stackRowClasses.root, props.className)} />;
};
