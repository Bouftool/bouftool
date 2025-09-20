import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Stack } from "@mui/material";
import { type ReactNode, useLayoutEffect, useState } from "react";
import { BoufField } from "src/front/components/Input/BoufField";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { ButtonWakfuBreed } from "src/front/components/Wakfu/Button/WakfuBreed";
import { EnumWakfuBreed } from "src/wakfu/breed/types";

export type TModalEditCharacterProps = {
  open: boolean;
  onClose?: () => void;
  character?: { name?: string; breed?: EnumWakfuBreed };
  onSubmit?: (name: string, breed: EnumWakfuBreed) => void | Promise<void>;
  title?: ReactNode;
  submitLabel?: ReactNode;
};

export const ModalEditCharacter = ({
  open,
  onClose,
  character,
  onSubmit,
  title,
  submitLabel,
}: TModalEditCharacterProps) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(character?.name || "");
  const [selectedBreed, setSelectedBreed] = useState<EnumWakfuBreed>(character?.breed || EnumWakfuBreed.Feca);

  const handleClickCancel = () => {
    onClose?.();
  };

  const handleClickSubmit = async () => {
    setLoading(true);
    await onSubmit?.(name, selectedBreed);
    setLoading(false);
    onClose?.();
  };

  useLayoutEffect(() => {
    if (open) {
      setName(character?.name || "");
      setSelectedBreed(character?.breed || EnumWakfuBreed.Feca);
    }
  }, [open, character]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h6">{title || "Nouveau Personnage"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <BoufField label="Nom du personnage" value={name} onChange={(evt) => setName(evt.target.value)} />
        <Stack>
          <InputLabel shrink size="small" sx={{ ml: 0.25, mb: -0.5 }}>
            Classe
          </InputLabel>
          <StackGrid
            columns={6}
            gap={1}
            sx={{ p: 1, maxWidth: 400, borderRadius: "8px", bgcolor: "background.default" }}
          >
            {Object.values(EnumWakfuBreed)
              .filter((breed) => typeof breed === "number")
              .map((breed) => (
                <ButtonWakfuBreed
                  key={breed}
                  sx={{ aspectRatio: "1" }}
                  selected={breed === selectedBreed}
                  onClick={() => setSelectedBreed(breed)}
                >
                  {breed}
                </ButtonWakfuBreed>
              ))}
          </StackGrid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="push" onClick={handleClickCancel}>
          Annuler
        </Button>
        <Button variant="push" onClick={handleClickSubmit} loading={loading} disabled={loading}>
          {submitLabel || "Créer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
