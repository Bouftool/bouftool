import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Button } from "@mui/material";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import type { EnumWakfuStat } from "src/wakfu/stats/types";

export type TBuildDetailsPreferencesSortableItemProps = {
  id: EnumWakfuStat;
};

export const BuildDetailsPreferencesSortableItem = ({ id }: TBuildDetailsPreferencesSortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ "&:hover": { cursor: isDragging ? "grabbing" : "grab", zIndex: isDragging ? 1 : "auto" } }}
    >
      <Button variant="push" size="small" sx={{ aspectRatio: "1", minWidth: 0, pointerEvents: "none" }}>
        <StatsIcon>{id}</StatsIcon>
      </Button>
    </Box>
  );
};
