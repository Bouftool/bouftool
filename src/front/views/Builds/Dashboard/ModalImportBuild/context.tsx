import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState } from "react";
import type { EnumWakfuBreed } from "src/wakfu/breed/types";
import { ModalImportBuild } from "./modal";

export type TModalImportBuildProviderState = {
  open: boolean;
  character: { name: string; breed: EnumWakfuBreed } | null;
  onSubmit: ((serializedBuild: string) => void | Promise<void>) | null;
  title?: ReactNode;
  submitLabel?: ReactNode;
};

const Context = createContext<Dispatch<SetStateAction<TModalImportBuildProviderState>> | undefined>(undefined);

export const useModalImportBuildContext = () => {
  const value = useContext(Context);
  if (value === undefined) {
    throw new Error("useModalImportBuildContext must be used within a ModalImportBuildProvider");
  }
  return value;
};

export type TModalImportBuildProviderProps = {
  children: ReactNode;
};

export const ModalImportBuildProvider = ({ children }: TModalImportBuildProviderProps) => {
  const [modalState, setModalState] = useState<TModalImportBuildProviderState>({
    open: false,
    character: null,
    onSubmit: null,
    title: null,
    submitLabel: null,
  });

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };

  return (
    <Context.Provider value={setModalState}>
      {children}
      <ModalImportBuild
        open={modalState.open}
        onClose={handleCloseModal}
        {...(modalState.title && { title: modalState.title })}
        {...(modalState.character && { character: modalState.character })}
        {...(modalState.onSubmit && { onSubmit: modalState.onSubmit })}
        {...(modalState.submitLabel && { submitLabel: modalState.submitLabel })}
      />
    </Context.Provider>
  );
};
