import { EnumWakfuItemType } from "../itemTypes/types";

const EncyclopediaBaseUrls: Record<string, { itemTypeIds: EnumWakfuItemType[]; baseUrl: string }> = {
  armors: {
    itemTypeIds: [
      EnumWakfuItemType.Amulet,
      EnumWakfuItemType.Ring,
      EnumWakfuItemType.Boots,
      EnumWakfuItemType.Cloak,
      EnumWakfuItemType.Helmet,
      EnumWakfuItemType.Belt,
      EnumWakfuItemType.Shoulders,
      EnumWakfuItemType.Breastplate,
    ],
    baseUrl: "https://www.wakfu.com/fr/mmorpg/encyclopedie/armures/",
  },
  weapons: {
    itemTypeIds: [
      EnumWakfuItemType.AxeTwoHanded,
      EnumWakfuItemType.BowTwoHanded,
      EnumWakfuItemType.CardOneHanded,
      EnumWakfuItemType.DaggerSecondHand,
      EnumWakfuItemType.HammerTwoHanded,
      EnumWakfuItemType.NeedleOneHanded,
      EnumWakfuItemType.ShieldSecondHand,
      EnumWakfuItemType.ShovelTwoHanded,
      EnumWakfuItemType.StaffOneHanded,
      EnumWakfuItemType.StaffTwoHanded,
      EnumWakfuItemType.SwordOneHanded,
      EnumWakfuItemType.SwordTwoHanded,
      EnumWakfuItemType.WandOneHanded,
    ],
    baseUrl: "https://www.wakfu.com/fr/mmorpg/encyclopedie/armes/",
  },
  pets: {
    itemTypeIds: [EnumWakfuItemType.Pet],
    baseUrl: "https://www.wakfu.com/fr/mmorpg/encyclopedie/familiers/",
  },
  accessories: {
    itemTypeIds: [EnumWakfuItemType.Emblem],
    baseUrl: "https://www.wakfu.com/fr/mmorpg/encyclopedie/accessoires/",
  },
  mounts: {
    itemTypeIds: [EnumWakfuItemType.Mount],
    baseUrl: "https://www.wakfu.com/fr/mmorpg/encyclopedie/montures/",
  },
};
export const DefaultEncyclopediaBaseUrl = "https://www.wakfu.com/fr/mmorpg/encyclopedie/ressources/";
export const EncyclopediaBaseUrlsMap = new Map<number, string>();
for (const key in EncyclopediaBaseUrls) {
  const { itemTypeIds, baseUrl } = EncyclopediaBaseUrls[key];
  for (const itemTypeId of itemTypeIds) {
    EncyclopediaBaseUrlsMap.set(itemTypeId, baseUrl);
  }
}
