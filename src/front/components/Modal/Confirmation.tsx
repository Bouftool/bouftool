import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { createContext, type ReactNode, useCallback, useContext, useState } from "react";

export type TModalConfirmationProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

export const ModalConfirmation = ({ open, onClose, onConfirm, title, message }: TModalConfirmationProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="subtitle2">{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="push" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="push" onClick={onConfirm}>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export type TModalConfirmationContext = (title: string, message: string) => Promise<boolean>;

const context = createContext<TModalConfirmationContext | undefined>(undefined);

export const useModalConfirmationContext = () => {
  const contextValue = useContext(context);
  if (!contextValue) {
    throw new Error("useModalConfirmationContext must be used within a ModalConfirmationProvider");
  }
  return contextValue;
};

export type TModalConfirmationProviderProps = {
  children: ReactNode;
};

export const ModalConfirmationProvider = ({ children }: TModalConfirmationProviderProps) => {
  const [state, setState] = useState({
    open: false,
    onClose: () => setState({ ...state, open: false }),
    onConfirm: () => {
      setState({ ...state, open: false });
    },
    title: "",
    message: "",
  });

  const confirm = useCallback(
    (title: string, message: string) =>
      new Promise<boolean>((resolve) => {
        setState({
          open: true,
          title,
          message,
          onConfirm: () => {
            setState((prev) => ({ ...prev, open: false }));
            resolve(true);
          },
          onClose: () => {
            setState((prev) => ({ ...prev, open: false }));
            resolve(false);
          },
        });
      }),
    [],
  );

  return (
    <context.Provider value={confirm}>
      {children}
      <ModalConfirmation {...state} />
    </context.Provider>
  );
};
