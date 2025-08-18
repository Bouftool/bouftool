import type { HTMLProps } from "react";

export type TRarityIconProps = Omit<HTMLProps<HTMLImageElement>, "src" | "alt"> & {
  children: number;
};

export const RarityIcon = ({ children, ...props }: TRarityIconProps) => {
  return <img src={`wakfu/rarities/${children}.png`} alt={`Rarity ${children}`} {...props} />;
};
