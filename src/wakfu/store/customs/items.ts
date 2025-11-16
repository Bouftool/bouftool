import { EnumWakfuRarity } from "src/wakfu/items/rarity";
import { EnumWakfuItemType } from "src/wakfu/itemTypes/types";
import { WakfuStats } from "src/wakfu/stats";
import { EnumWakfuStat } from "src/wakfu/stats/types";

const BaseCustomItemId = 100000;

export const CustomItems = [
  {
    id: BaseCustomItemId + 1,
    level: 1,
    itemType: EnumWakfuItemType.Pet,
    rarity: EnumWakfuRarity.Rare,
    gfxId: 1000000000,
    recipes: [],
    title: {
      fr: "Néo-Familier",
      en: "Neo-Pet",
      es: "Neo-Mascota",
      pt: "Neo-Pet",
    },
    description: {
      fr: "Un compagnon fidèle pour vos néo-aventures.",
      en: "A faithful companion for your neo-adventures.",
      es: "Un compañero fiel para tus neo-aventuras.",
      pt: "Um companheiro fiel para suas neo-aventuras.",
    },
    stats: new WakfuStats({
      [EnumWakfuStat.ElementalMasteryByLevel]: 100,
      [EnumWakfuStat.HealthPointByLevel]: 200,
      [EnumWakfuStat.Willpower]: 5,
      [EnumWakfuStat.CriticalHit]: 3,
      [EnumWakfuStat.Block]: 3,
      [EnumWakfuStat.HarvestBonus]: 50,
    }),
  },
  {
    id: BaseCustomItemId + 2,
    level: 1,
    itemType: EnumWakfuItemType.Pet,
    rarity: EnumWakfuRarity.Rare,
    gfxId: 1000000001,
    recipes: [],
    title: {
      fr: "Néo-Familier intermédiaire",
      en: "Neo-Pet intermediate",
      es: "Neo-Mascota intermedio",
      pt: "Neo-Pet intermediário",
    },
    description: {
      fr: "Un compagnon fidèle pour vos néo-aventures.",
      en: "A faithful companion for your neo-adventures.",
      es: "Un compañero fiel para tus neo-aventuras.",
      pt: "Um companheiro fiel para suas neo-aventuras.",
    },
    stats: new WakfuStats({
      [EnumWakfuStat.MovementPoint]: 1,
      [EnumWakfuStat.ElementalMasteryByLevel]: 150,
      [EnumWakfuStat.HealthPointByLevel]: 300,
      [EnumWakfuStat.Willpower]: 10,
      [EnumWakfuStat.CriticalHit]: 3,
      [EnumWakfuStat.Block]: 3,
      [EnumWakfuStat.HarvestBonus]: 50,
    }),
  },
  {
    id: BaseCustomItemId + 3,
    level: 1,
    itemType: EnumWakfuItemType.Pet,
    rarity: EnumWakfuRarity.Rare,
    gfxId: 1000000002,
    recipes: [],
    title: {
      fr: "Néo-Familier accompli",
      en: "Neo-Pet accomplished",
      es: "Neo-Mascota consumado",
      pt: "Neo-Pet realizado",
    },
    description: {
      fr: "Un compagnon fidèle pour vos néo-aventures.",
      en: "A faithful companion for your neo-adventures.",
      es: "Un compañero fiel para tus neo-aventuras.",
      pt: "Um companheiro fiel para suas neo-aventuras.",
    },
    stats: new WakfuStats({
      [EnumWakfuStat.MovementPoint]: 1,
      [EnumWakfuStat.WakfuPoint]: 2,
      [EnumWakfuStat.ElementalMasteryByLevel]: 200,
      [EnumWakfuStat.HealthPointByLevel]: 400,
      [EnumWakfuStat.Willpower]: 15,
      [EnumWakfuStat.CriticalHit]: 3,
      [EnumWakfuStat.Block]: 3,
      [EnumWakfuStat.HarvestBonus]: 50,
    }),
  },
  {
    id: BaseCustomItemId + 4,
    level: 1,
    itemType: EnumWakfuItemType.Pet,
    rarity: EnumWakfuRarity.Rare,
    gfxId: 1000000003,
    recipes: [],
    title: {
      fr: "Néo-Familier ultime",
      en: "Neo-Pet ultimate",
      es: "Neo-Mascota última",
      pt: "Neo-Pet último",
    },
    description: {
      fr: "Un compagnon fidèle pour vos néo-aventures.",
      en: "A faithful companion for your neo-adventures.",
      es: "Un compañero fiel para tus neo-aventuras.",
      pt: "Um companheiro fiel para suas neo-aventuras.",
    },
    stats: new WakfuStats({
      [EnumWakfuStat.ActionPoint]: 1,
      [EnumWakfuStat.MovementPoint]: 1,
      [EnumWakfuStat.WakfuPoint]: 2,
      [EnumWakfuStat.ElementalMasteryByLevel]: 200,
      [EnumWakfuStat.HealthPointByLevel]: 400,
      [EnumWakfuStat.Willpower]: 20,
      [EnumWakfuStat.CriticalHit]: 3,
      [EnumWakfuStat.Block]: 3,
      [EnumWakfuStat.HarvestBonus]: 50,
    }),
  },
];
