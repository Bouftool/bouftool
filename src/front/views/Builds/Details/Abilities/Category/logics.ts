import { useLayoutEffect, useState } from "react";

export type TUseTooltipStateOptions = {
  disableRemoveTooltip?: boolean;
  disableAddTooltip?: boolean;
};

export const useTooltipState = (options: TUseTooltipStateOptions) => {
  const [state, setState] = useState({
    row: false,
    remove: false,
    add: false,
  });

  const handleRowTooltipOpen = () => {
    setState((prev) => ({
      ...prev,
      row: true,
    }));
  };
  const handleRowTooltipClose = () => {
    setState((prev) => ({
      ...prev,
      row: prev.add || prev.remove,
    }));
  };

  const handleRemoveTooltipOpen = () => {
    if (options.disableRemoveTooltip) {
      return;
    }
    setState((prev) => ({
      ...prev,
      remove: true,
    }));
  };
  const handleRemoveTooltipClose = () => {
    setState((prev) => ({
      ...prev,
      remove: false,
    }));
  };

  const handleAddTooltipOpen = () => {
    if (options.disableAddTooltip) {
      return;
    }
    setState((prev) => ({
      ...prev,
      add: true,
    }));
  };
  const handleAddTooltipClose = () => {
    setState((prev) => ({
      ...prev,
      add: false,
    }));
  };

  useLayoutEffect(() => {
    setState((prev) => ({
      ...prev,
      remove: options.disableRemoveTooltip ? false : prev.remove,
      add: options.disableAddTooltip ? false : prev.add,
    }));
  }, [options.disableRemoveTooltip, options.disableAddTooltip]);

  return {
    managedRowTooltipOpen: state.row,
    removeTooltipOpen: state.remove,
    addTooltipOpen: state.add,
    handleRowTooltipOpen,
    handleRowTooltipClose,
    handleRemoveTooltipOpen,
    handleRemoveTooltipClose,
    handleAddTooltipOpen,
    handleAddTooltipClose,
  };
};
