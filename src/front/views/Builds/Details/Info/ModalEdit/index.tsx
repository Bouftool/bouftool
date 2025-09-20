import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { BoufField } from "src/front/components/Input/BoufField";
import { sendElectronEvent } from "src/front/hooks/electron";
import { useBuildDetailsContext } from "../../context";
import { ModalBuildDetailsInfoEditRoot, modalBuildDetailsInfoEditClasses } from "./styles";

export type TModalBuildDetailsInfoEditProps = {
  open: boolean;
  onClose: () => void;
};

export const ModalBuildDetailsInfoEdit = ({ open, onClose }: TModalBuildDetailsInfoEditProps) => {
  const build = useBuildDetailsContext();
  const [name, setName] = useState(build.name);
  const [level, setLevel] = useState(String(build.level));

  const handleSubmit = () => {
    sendElectronEvent(ElectronEvents.BuildSetInfo, {
      buildId: build.id,
      name,
      level: Number(level),
    });
    onClose();
  };

  useLayoutEffect(() => {
    setName(build.name);
    setLevel(String(build.level));
  }, [build.name, build.level]);

  return (
    <ModalBuildDetailsInfoEditRoot className={modalBuildDetailsInfoEditClasses.root} open={open} onClose={onClose}>
      <DialogTitle variant="subtitle2">Modifier</DialogTitle>
      <DialogContent className={modalBuildDetailsInfoEditClasses.content}>
        <BoufField label="Nom du build" size="small" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <BoufField
          label="Niveau"
          size="small"
          fullWidth
          value={level}
          onChange={(e) => {
            const number = Number(e.target.value);
            !Number.isNaN(number) && number >= 0 && setLevel(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="push" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="push" onClick={handleSubmit}>
          Valider
        </Button>
      </DialogActions>
    </ModalBuildDetailsInfoEditRoot>
  );
};
