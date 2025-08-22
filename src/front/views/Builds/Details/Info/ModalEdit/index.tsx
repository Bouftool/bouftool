import {
  Button,
  ButtonBase,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { clsx } from "clsx";
import { useLayoutEffect, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { isNumber } from "src/types/utils";
import { WakfuBreed } from "src/wakfu/types/breed";
import { useBuildDetailsContext } from "../../context";
import { ModalBuildDetailsInfoEditRoot, modalBuildDetailsInfoEditClasses } from "./styles";

export type TModalBuildDetailsInfoEditProps = {
  open: boolean;
  onClose: () => void;
};

export const ModalBuildDetailsInfoEdit = ({ open, onClose }: TModalBuildDetailsInfoEditProps) => {
  const build = useBuildDetailsContext();
  const [selectedBreed, setSelectedBreed] = useState<WakfuBreed>(build.breed);
  const [name, setName] = useState(build.name);
  const [level, setLevel] = useState(String(build.level));

  const handleSubmit = () => {
    sendElectronEvent(ElectronEvents.BuildSetInfo, {
      buildId: build.id,
      breed: selectedBreed,
      name,
      level: Number(level),
    });
    onClose();
  };

  useLayoutEffect(() => {
    setSelectedBreed(build.breed);
    setName(build.name);
    setLevel(String(build.level));
  }, [build.breed, build.name, build.level]);

  return (
    <ModalBuildDetailsInfoEditRoot className={modalBuildDetailsInfoEditClasses.root} open={open} onClose={onClose}>
      <DialogTitle variant="subtitle2">Modifier</DialogTitle>
      <DialogContent className={modalBuildDetailsInfoEditClasses.content}>
        <StackGrid columns={6} gap={1} sx={{ width: 44 * 6 + 8 * 5 }}>
          {Object.values(WakfuBreed).map(
            (breed) =>
              isNumber(breed) && (
                <ButtonBase
                  key={breed}
                  className={clsx(modalBuildDetailsInfoEditClasses.breedButton, {
                    "Mui-selected": breed === selectedBreed,
                  })}
                  onClick={() => setSelectedBreed(breed)}
                >
                  <BreedFaceIcon width={44}>{breed}</BreedFaceIcon>
                </ButtonBase>
              ),
          )}
        </StackGrid>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom du build"
          size="small"
          fullWidth
          sx={{ mt: 1 }}
        />
        <TextField
          value={level}
          onChange={(e) => {
            const number = Number(e.target.value);
            !Number.isNaN(number) && number >= 0 && setLevel(e.target.value);
          }}
          size="small"
          sx={{ width: 100 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="caption">Niv.</Typography>
                </InputAdornment>
              ),
            },
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
