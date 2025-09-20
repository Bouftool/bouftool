import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState } from "react";
import type { EnumWakfuBreed } from "src/wakfu/breed/types";
import { ModalEditCharacter } from "./modal";

export type TModalEditCharacterProviderState = {
  open: boolean;
  character: { name?: string; breed?: EnumWakfuBreed } | null;
  onSubmit: ((name: string, breed: EnumWakfuBreed) => void | Promise<void>) | null;
  title?: ReactNode;
  submitLabel?: ReactNode;
};

const Context = createContext<Dispatch<SetStateAction<TModalEditCharacterProviderState>> | undefined>(undefined);

export const useModalEditCharacterContext = () => {
  const value = useContext(Context);
  if (value === undefined) {
    throw new Error("useModalEditCharacterContext must be used within a ModalEditCharacterProvider");
  }
  return value;
};

export type TModalEditCharacterProviderProps = {
  children: ReactNode;
};

export const ModalEditCharacterProvider = ({ children }: TModalEditCharacterProviderProps) => {
  const [modalState, setModalState] = useState<TModalEditCharacterProviderState>({
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
      <ModalEditCharacter
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
