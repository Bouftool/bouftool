import type { HTMLProps } from "react";

const Exceptions = [
  { originTypes: [108, 110, 112, 113, 115, 254], replacedBy: 518 },
  { originTypes: [101, 111, 114, 117, 223, 253], replacedBy: 519 },
  { originTypes: [189], replacedBy: 520 },
];

export interface ItemTypeIconProps extends Omit<HTMLProps<HTMLImageElement>, "children" | "src" | "alt"> {
  children: number;
}

export const ItemTypeIcon = ({ children, ...props }: ItemTypeIconProps) => {
  const exception = Exceptions.find((ex) => ex.originTypes.includes(children));
  const effectiveType = exception ? exception.replacedBy : children;
  return <img src={`wakfu/itemTypes/${effectiveType}.png`} alt={String(effectiveType)} {...props} />;
};
