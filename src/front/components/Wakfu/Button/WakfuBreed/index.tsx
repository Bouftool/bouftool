import type { ButtonBaseProps } from "@mui/material";
import clsx from "clsx";
import type { EnumWakfuBreed } from "src/wakfu/breed/types";
import { BreedFaceIcon } from "../../BreedFaceIcon";
import { ButtonWakfuBreedRoot, buttonWakfuBreedClasses } from "./styles";

export type TButtonWakfuBreedProps = ButtonBaseProps & {
  selected?: boolean;
  children: EnumWakfuBreed;
};

export const ButtonWakfuBreed = ({ selected, children, ...props }: TButtonWakfuBreedProps) => {
  return (
    <ButtonWakfuBreedRoot
      {...props}
      className={clsx(buttonWakfuBreedClasses.root, { "Mui-selected": selected }, props.className)}
    >
      <BreedFaceIcon className={buttonWakfuBreedClasses.breedFace}>{children}</BreedFaceIcon>
    </ButtonWakfuBreedRoot>
  );
};
