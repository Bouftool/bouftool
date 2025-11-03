import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/material";
import type React from "react";
import { useState } from "react";
import { StackRow } from "../Layout/StackRow";
import {
  TreeItemBackLine,
  TreeItemDashLine,
  TreeItemStyled,
  TreeViewStyled,
  treeItemBackLineClasses,
  treeItemClasses,
  treeItemDashLineClasses,
  treeViewClasses,
} from "./styles";

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  indicatorColor?: string;
  children?: TreeNode[];
  defaultExpanded?: boolean;
  onClick?: () => void;
  actions?: React.ReactNode;
}

interface TreeItemProps {
  node: TreeNode;
  isLast: boolean;
  depth: number;
  disableCollapse?: boolean;
}

interface TreeViewProps {
  nodes: TreeNode[];
}

export const TreeItem: React.FC<TreeItemProps> = ({ node, isLast, depth, disableCollapse }) => {
  const [expanded, setExpanded] = useState(node.defaultExpanded ?? false);
  const hasChildren = (node.children && node.children.length > 0) ?? false;

  const handleToggle = () => {
    if (disableCollapse) {
      return;
    }
    if (hasChildren) {
      setExpanded(!expanded);
    }
    node.onClick?.();
  };

  const isRoot = depth === 0;

  return (
    <TreeItemStyled className={treeItemClasses.root} hasChildren={hasChildren} indicatorColor={node.indicatorColor}>
      {!isRoot && (
        <>
          <TreeItemBackLine className={treeItemBackLineClasses.root} isLast={isLast} hasChildren={hasChildren} />
          <TreeItemDashLine className={treeItemDashLineClasses.root} isLast={isLast} hasChildren={hasChildren} />
        </>
      )}

      <Box onClick={handleToggle} className={treeItemClasses.cardBorder}>
        <Box className={treeItemClasses.card}>
          <StackRow sx={{ "&&": { gap: 0 } }}>
            {hasChildren && !disableCollapse ? (
              expanded ? (
                <ExpandMore sx={{ fontSize: 20 }} />
              ) : (
                <ChevronRight sx={{ fontSize: 20 }} />
              )
            ) : null}
            {node.icon}
            {node.label}
          </StackRow>
          {node.actions && node.actions}
        </Box>
      </Box>

      {hasChildren && expanded && (
        <TreeViewStyled className={treeViewClasses.root} child>
          {node.children?.map((child, index) => (
            <TreeItem
              key={child.id}
              node={child}
              isLast={index === (node.children?.length ?? 0) - 1}
              depth={depth + 1}
            />
          ))}
        </TreeViewStyled>
      )}
    </TreeItemStyled>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({ nodes }) => {
  return (
    <TreeViewStyled className={treeViewClasses.root}>
      {nodes.map((node, index) => (
        <TreeItem key={node.id} node={node} isLast={index === nodes.length - 1} depth={0} />
      ))}
    </TreeViewStyled>
  );
};
