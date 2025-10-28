import { styled } from "@mui/material";

const TreeViewPrefix = "TreeView";

export const treeViewClasses = {
  root: `${TreeViewPrefix}-root`,
};

export const TreeViewStyled = styled("ul")<{ child?: boolean }>(({ theme, child }) => ({
  [`&.${treeViewClasses.root}`]: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    ...(child && {
      position: "relative",
      paddingLeft: theme.spacing(5),
    }),
  },
}));

const TreeItemPrefix = "TreeItem";

export const treeItemClasses = {
  root: `${TreeItemPrefix}-root`,
  cardBorder: `${TreeItemPrefix}-cardBorder`,
  card: `${TreeItemPrefix}-card`,
};

export const TreeItemStyled = styled("li")<{ indicatorColor?: string; hasChildren: boolean }>(
  ({ theme, indicatorColor, hasChildren }) => ({
    [`&.${treeItemClasses.root}`]: {
      position: "relative",
      listStyle: "none",
      [`& .${treeItemClasses.cardBorder}`]: {
        position: "relative",
        borderRadius: theme.spacing(1),
        margin: theme.spacing(1),
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        ...(indicatorColor && {
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0.5,
            top: 0,
            bottom: 0,
            width: 5,
            borderRadius: "8px 0 0 8px",
            backgroundColor: indicatorColor,
          },
        }),
        [`& .${treeItemClasses.card}`]: {
          padding: theme.spacing(1),
          backgroundColor: hasChildren ? theme.palette.surface[150] : theme.palette.surface[250],
          borderRadius: theme.spacing(1),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          width: "100%",
        },
      },
    },
  }),
);

const TreeItemBackLinePrefix = "TreeItemBackLine";

export const treeItemBackLineClasses = {
  root: `${TreeItemBackLinePrefix}-root`,
};

export const TreeItemBackLine = styled("div")<{ isLast: boolean }>(({ theme, isLast }) => ({
  [`&.${treeItemBackLineClasses.root}`]: {
    position: "absolute",
    left: -15,
    top: -8,
    width: 2,
    height: isLast ? 30 : "calc(100% + 8px)",
    backgroundColor: theme.palette.surface[250],
  },
}));

const TreeItemDashLinePrefix = "TreeItemDashLine";

export const treeItemDashLineClasses = {
  root: `${TreeItemDashLinePrefix}-root`,
};

export const TreeItemDashLine = styled("div")<{ isLast: boolean; hasChildren: boolean }>(
  ({ theme, isLast, hasChildren }) => ({
    [`&.${treeItemDashLineClasses.root}`]: {
      position: "absolute",
      left: isLast ? -15 : -13,
      top: hasChildren ? 26 : 22,
      width: 24,
      height: 2,
      backgroundColor: theme.palette.surface[250],
    },
  }),
);
