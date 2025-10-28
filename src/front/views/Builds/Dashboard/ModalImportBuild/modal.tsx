import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { type ReactNode, useLayoutEffect, useState } from "react";
import { BoufField } from "src/front/components/Input/BoufField";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { EnumWakfuBreed } from "src/wakfu/breed/types";

export type TModalImportBuildProps = {
  open: boolean;
  onClose?: () => void;
  character?: { name: string; breed: EnumWakfuBreed };
  onSubmit?: (serializedBuild: string) => void | Promise<void>;
  title?: ReactNode;
  submitLabel?: ReactNode;
};

export const ModalImportBuild = ({
  open,
  onClose,
  character,
  onSubmit,
  title,
  submitLabel,
}: TModalImportBuildProps) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(character?.name || "");
  const [breed, setBreed] = useState<EnumWakfuBreed>(character?.breed || EnumWakfuBreed.Feca);
  const [serializedBuild, setSerializedBuild] = useState("");

  const reset = () => {
    setSerializedBuild("");
  };

  const handleClickCancel = () => {
    onClose?.();
    reset();
  };

  const handleClickSubmit = async () => {
    setLoading(true);
    await onSubmit?.(serializedBuild);
    setLoading(false);
    onClose?.();
    reset();
  };

  useLayoutEffect(() => {
    if (open) {
      setName(character?.name || "");
      setBreed(character?.breed || EnumWakfuBreed.Feca);
    }
  }, [open, character]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <BreedFaceIcon width={44}>{breed}</BreedFaceIcon>
        {title || `Importer un build pour ${name}`}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <BoufField
          placeholder="Collez ici"
          value={serializedBuild}
          onChange={(evt) => setSerializedBuild(evt.target.value)}
          multiline
          minRows={4}
          maxRows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickCancel} disabled={loading}>
          Annuler
        </Button>
        <Button variant="contained" onClick={handleClickSubmit} disabled={loading || !serializedBuild}>
          {submitLabel || "Importer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
