import { Backdrop, Grow, type PaperProps, Portal } from "@mui/material";
import clsx from "clsx";
import { type ReactNode, useRef } from "react";
import { PopoverPaper, popoverPaperClasses, type TPopoverPaperProps } from "./styles";

const correctPosition = (
  anchorPosition: TPopoverPaperProps["anchorPosition"],
  paperElem: HTMLDivElement | null,
  backdropElem: HTMLDivElement | null,
) => {
  const paperWidth = paperElem?.offsetWidth || 0;
  const backdropWidth = backdropElem?.offsetWidth || 0;
  if (anchorPosition.left + paperWidth > backdropWidth) {
    anchorPosition.left -= anchorPosition.left + paperWidth - backdropWidth;
    if (anchorPosition.left < 0) {
      anchorPosition.left = 0;
    }
  }
  const paperHeight = paperElem?.offsetHeight || 0;
  const backdropHeight = backdropElem?.offsetHeight || 0;
  if (anchorPosition.top + paperHeight > backdropHeight) {
    anchorPosition.top -= anchorPosition.top + paperHeight - backdropHeight;
    if (anchorPosition.top < 0) {
      anchorPosition.top = 0;
    }
  }
  return anchorPosition;
};

export type TPopoverProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
  onClose: () => void;
  children: ReactNode;
  slotProps?: {
    paper: Partial<PaperProps>;
  };
};

const getAnchorPosition = (anchorEl: HTMLElement | null, anchorOrigin?: TPopoverProps["anchorOrigin"]) => {
  if (!anchorEl) return { top: 0, left: 0 };
  const clientRect = anchorEl.getBoundingClientRect();
  return {
    top: anchorOrigin?.vertical === "bottom" ? clientRect.bottom : clientRect.top,
    left: anchorOrigin?.horizontal === "right" ? clientRect.right : clientRect.left,
  };
};

export const Popover = ({ open, anchorEl, anchorOrigin, onClose, children, slotProps }: TPopoverProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  return (
    <Portal>
      <Backdrop
        open={open}
        invisible
        onClick={onClose}
        sx={{ zIndex: (theme) => theme.zIndex.modal }}
        ref={backdropRef}
      >
        <Grow in={open} style={{ transformOrigin: "top left" }} timeout={300}>
          <PopoverPaper
            {...slotProps?.paper}
            anchorPosition={correctPosition(
              getAnchorPosition(anchorEl, anchorOrigin),
              paperRef.current,
              backdropRef.current,
            )}
            className={clsx(popoverPaperClasses.root, slotProps?.paper?.className)}
            onClick={(evt) => evt.stopPropagation()}
            ref={paperRef}
          >
            {children}
          </PopoverPaper>
        </Grow>
      </Backdrop>
    </Portal>
  );
};
