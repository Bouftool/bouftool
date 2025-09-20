import { InputBase, type InputBaseProps, InputLabel } from "@mui/material";
import clsx from "clsx";
import { BoufFieldRoot, boufFieldClasses } from "./styles";

export type TBoufFieldProps = InputBaseProps & {
  label: string;
};

export const BoufField = ({ label, ...props }: TBoufFieldProps) => {
  return (
    <BoufFieldRoot variant="standard" className={boufFieldClasses.root}>
      <InputLabel shrink className={boufFieldClasses.label}>
        {label}
      </InputLabel>
      <InputBase {...props} className={clsx(boufFieldClasses.input, props.className)} />
    </BoufFieldRoot>
  );
};
