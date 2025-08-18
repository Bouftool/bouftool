import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Button, type ButtonProps } from "@mui/material";
import { forwardRef, type ReactNode, type SetStateAction, useRef, useState } from "react";
import { Popover, type TPopoverProps } from "./Popover";

export type TSidePopoverProps = {
  label: ReactNode;
  children: ReactNode;
  onToggle?: (open: boolean) => void;
  slotProps?: {
    button?: Omit<ButtonProps, "onClick" | "ref">;
    popover?: Omit<TPopoverProps, "open" | "anchorEl" | "anchorOrigin" | "onClose">;
  };
};

export const SidePopover = forwardRef(({ label, children, onToggle, slotProps }: TSidePopoverProps, ref) => {
  const [open, _setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const setOpen = (open: SetStateAction<boolean>) => {
    _setOpen((prevOpen) => {
      const newOpen = typeof open === "function" ? open(prevOpen) : open;
      onToggle?.(newOpen);
      return newOpen;
    });
  };

  return (
    <>
      <Button
        variant="push"
        endIcon={open ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        onClick={() => setOpen((open) => !open)}
        ref={(elem) => {
          anchorRef.current = elem;
          if (typeof ref === "function") {
            ref(elem);
          } else if (ref) {
            ref.current = elem;
          }
        }}
        {...slotProps?.button}
      >
        {label}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpen(false)}
        {...slotProps?.popover}
      >
        {children}
      </Popover>
    </>
  );
});
