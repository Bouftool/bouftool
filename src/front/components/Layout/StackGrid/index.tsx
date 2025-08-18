import { Stack, type StackProps, styled } from "@mui/material";

export type TStackGridProps = Omit<StackProps, "gap" | "direction" | "columnGap"> & {
  columns: number;
  gap?: number;
  columnGap?: number;
};

export const StackGrid = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "columns" && prop !== "gap" && prop !== "columnGap",
})<TStackGridProps>(({ theme, columns, gap, columnGap }) => {
  const effectiveGap = columnGap ?? gap ?? 0;
  const effectiveGapcalc = `${theme.spacing(effectiveGap / (columns - 1))}`;
  return {
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: `-${effectiveGapcalc}`,
    ...(gap && { gap: theme.spacing(gap) }),
    ...(columnGap && { columnGap: theme.spacing(columnGap) }),
    "& > *": {
      flex: `0 0 calc(${100 / columns}% - ${effectiveGapcalc})`,
      minWidth: `calc(${100 / columns}% - ${effectiveGapcalc})`,
      maxWidth: `calc(${100 / columns}% - ${effectiveGapcalc})`,
    },
  };
});
