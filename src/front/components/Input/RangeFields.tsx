import { type BoxProps, Input, Typography } from "@mui/material";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { RangeFieldsControl, rangeFieldsClasses } from "./styles";

export type TRangeFieldsProps = {
  label: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  slotProps?: {
    box?: BoxProps;
  };
};

export const RangeFields = ({ label, value, min, max, onChange, slotProps }: TRangeFieldsProps) => {
  const [focused, setFocused] = useState(false);
  const minInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const maxInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: 0 | 1) => {
    let newValue = Number(event.target.value);
    if (Number.isNaN(newValue)) {
      return;
    }
    newValue = Math.min(Math.max(newValue, min), max);
    onChange(index === 0 ? [newValue, value[1]] : [value[0], newValue]);
  };

  useEffect(() => {
    if (minInputRef.current && Number(minInputRef.current.value) !== value[0]) {
      minInputRef.current.value = String(value[0]);
    }
    if (maxInputRef.current && Number(maxInputRef.current.value) !== value[1]) {
      maxInputRef.current.value = String(value[1]);
    }
  }, [value]);

  return (
    <RangeFieldsControl className={rangeFieldsClasses.root} focused={focused} {...slotProps?.box}>
      <Typography variant="body1" color="textDisabled" sx={{ pl: "14px", mr: -0.5 }}>
        {label}
      </Typography>
      <Input
        onChange={(e) => handleChange(e, 0)}
        size="small"
        disableUnderline
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        inputRef={minInputRef}
      />
      <Typography variant="body1" color="textDisabled">
        -
      </Typography>
      <Input
        onChange={(e) => handleChange(e, 1)}
        size="small"
        disableUnderline
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        inputRef={maxInputRef}
      />
      <fieldset className={rangeFieldsClasses.notchedOutline} />
    </RangeFieldsControl>
  );
};
