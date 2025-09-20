import type { HTMLProps } from "react";
import type { EnumWakfuRarity } from "src/wakfu/items/rarity";

export type TRarityIconProps = Omit<HTMLProps<HTMLImageElement>, "src" | "alt"> & {
  children: EnumWakfuRarity;
};

export const RarityIcon = ({ children, ...props }: TRarityIconProps) => {
  return <img src={`wakfu/rarities/${children}.png`} alt={`Rarity ${children}`} {...props} />;
};
