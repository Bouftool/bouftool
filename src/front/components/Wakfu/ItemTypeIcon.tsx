import type { HTMLProps } from "react";
import { EnumWakfuItemType } from "src/wakfu/itemTypes/types";

const Exceptions = [
  {
    originTypes: [
      EnumWakfuItemType.WandOneHanded,
      EnumWakfuItemType.SwordOneHanded,
      EnumWakfuItemType.StaffOneHanded,
      EnumWakfuItemType.NeedleOneHanded,
      EnumWakfuItemType.CardOneHanded,
    ],
    replacedBy: EnumWakfuItemType.OneHandedWeapon,
  },
  {
    originTypes: [
      EnumWakfuItemType.AxeTwoHanded,
      EnumWakfuItemType.ShovelTwoHanded,
      EnumWakfuItemType.HammerTwoHanded,
      EnumWakfuItemType.BowTwoHanded,
      EnumWakfuItemType.SwordTwoHanded,
      EnumWakfuItemType.StaffTwoHanded,
    ],
    replacedBy: EnumWakfuItemType.TwoHandedWeapon,
  },
  {
    originTypes: [EnumWakfuItemType.DaggerSecondHand, EnumWakfuItemType.ShieldSecondHand],
    replacedBy: EnumWakfuItemType.SecondHand,
  },
];

export interface ItemTypeIconProps extends Omit<HTMLProps<HTMLImageElement>, "children" | "src" | "alt"> {
  children: EnumWakfuItemType;
}

export const ItemTypeIcon = ({ children, ...props }: ItemTypeIconProps) => {
  const exception = Exceptions.find((ex) => ex.originTypes.includes(children));
  const effectiveType = exception ? exception.replacedBy : children;
  return <img src={`wakfu/itemTypes/${effectiveType}.png`} alt={String(effectiveType)} {...props} />;
};
