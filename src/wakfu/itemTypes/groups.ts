import { EnumWakfuItemType } from "./types";

const ItemTypeGroups: Partial<Record<EnumWakfuItemType, EnumWakfuItemType>> = {
  [EnumWakfuItemType.WandOneHanded]: EnumWakfuItemType.OneHandedWeapon,
  [EnumWakfuItemType.SwordOneHanded]: EnumWakfuItemType.OneHandedWeapon,
  [EnumWakfuItemType.StaffOneHanded]: EnumWakfuItemType.OneHandedWeapon,
  [EnumWakfuItemType.NeedleOneHanded]: EnumWakfuItemType.OneHandedWeapon,
  [EnumWakfuItemType.CardOneHanded]: EnumWakfuItemType.OneHandedWeapon,
  [EnumWakfuItemType.AxeTwoHanded]: EnumWakfuItemType.TwoHandedWeapon,
  [EnumWakfuItemType.ShovelTwoHanded]: EnumWakfuItemType.TwoHandedWeapon,
  [EnumWakfuItemType.HammerTwoHanded]: EnumWakfuItemType.TwoHandedWeapon,
  [EnumWakfuItemType.BowTwoHanded]: EnumWakfuItemType.TwoHandedWeapon,
  [EnumWakfuItemType.SwordTwoHanded]: EnumWakfuItemType.TwoHandedWeapon,
  [EnumWakfuItemType.StaffTwoHanded]: EnumWakfuItemType.TwoHandedWeapon,
  [EnumWakfuItemType.DaggerSecondHand]: EnumWakfuItemType.SecondHand,
  [EnumWakfuItemType.ShieldSecondHand]: EnumWakfuItemType.SecondHand,
  [EnumWakfuItemType.LuckyCharm]: EnumWakfuItemType.Pet,
};

export const getWakfuItemTypeGroup = (itemType: EnumWakfuItemType): EnumWakfuItemType | undefined => {
  return ItemTypeGroups[itemType];
};
