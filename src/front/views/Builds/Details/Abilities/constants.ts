import { EnumAbilities } from "src/wakfu/abilities/types";
import { EnumWakfuStat } from "src/wakfu/stats/types";

export const AbilitiesDisplay: Record<EnumAbilities, { icon: EnumWakfuStat; label: string; description?: string }> = {
  [EnumAbilities.PercentHp]: {
    icon: EnumWakfuStat.PercentHealthPoint,
    label: "% Point de vie",
  },
  [EnumAbilities.Resistance]: {
    icon: EnumWakfuStat.ElementalResistance,
    label: "Résistance élémentaire",
    description: "Résistance aux dégâts de tous les éléments.",
  },
  [EnumAbilities.Barrier]: {
    icon: EnumWakfuStat.Barrier,
    label: "Barrière",
  },
  [EnumAbilities.HealingReceived]: {
    icon: EnumWakfuStat.HealingReceived,
    label: "% Soins reçus",
  },
  [EnumAbilities.PercentHpToArmor]: {
    icon: EnumWakfuStat.PercentHealthPointToArmor,
    label: "% Points de vie en armure",
  },
  [EnumAbilities.Mastery]: {
    icon: EnumWakfuStat.ElementalMastery,
    label: "Maîtrise élémentaire",
    description: "Bonus aux dégâts de tous les éléments.",
  },
  [EnumAbilities.MeleeMastery]: {
    icon: EnumWakfuStat.MeleeMastery,
    label: "Maîtrise mêlée",
    description:
      "La maîtrise mêlée s'ajoute à la maîtrise élémentaire pour amplifier les dommages infligés aux cibles se trouvant à 2 cases et moins de l'attaquant.",
  },
  [EnumAbilities.RangeMastery]: {
    icon: EnumWakfuStat.DistanceMastery,
    label: "Maîtrise à distance",
    description:
      "La maîtrise à distance s'ajoute à la maîtrise élémentaire pour amplifier les dommages infligés aux cibles se trouvant 3 cases et plus de l'attaquant.",
  },
  [EnumAbilities.Hp]: {
    icon: EnumWakfuStat.HealthPoint,
    label: "Points de vie",
  },
  [EnumAbilities.Lock]: {
    icon: EnumWakfuStat.Lock,
    label: "Tacle",
    description:
      "Le tacle augmente votre capacité à maintenir un adversaire au contact. Cette caractéristique est contre-balancée par l'esquive de votre adversaire.",
  },
  [EnumAbilities.Dodge]: {
    icon: EnumWakfuStat.Dodge,
    label: "Esquive",
    description:
      "L'esquive augmente votre capacité à vous éloigner d'un adversaire au contact. Cette caractéristique est contre-balancée par le tacle de votre adversaire.",
  },
  [EnumAbilities.Initiative]: {
    icon: EnumWakfuStat.Initiative,
    label: "Initiative",
    description:
      "Augmente votre score d'initiative et celui de votre équipe.\n\nLe premier combattant à jouer est celui appartenant à l'équipe ayant le plus d'initiative. Les combattants se succèdent ensuite, d'une équipe puis de l'autre, par ordre d'initiative (de la plus haute à la plus basse).\n\nLes invocations jouent juste après leur invocateur.",
  },
  [EnumAbilities.LockAndDodge]: {
    icon: EnumWakfuStat.Lock,
    label: "Tacle et Esquive",
  },
  [EnumAbilities.Willpower]: {
    icon: EnumWakfuStat.Willpower,
    label: "Volonté",
    description: "Augmente votre capacité à retirer des PA et PM, ainsi que votre résistance aux pertes de PA et PM.",
  },
  [EnumAbilities.CriticalRate]: {
    icon: EnumWakfuStat.CriticalHit,
    label: "% Coup critique",
    description:
      "Chaque point en Coup critique augmente de 1% vos chances de réaliser un coup critique. Les coups critiques augmentent les dommages infligés de 25%.",
  },
  [EnumAbilities.Block]: {
    icon: EnumWakfuStat.Block,
    label: "% Parade",
    description: "Chaque point en Parade augmente de 1% vos chances de réduire de 20% les dommages reçus.",
  },
  [EnumAbilities.CriticalMastery]: {
    icon: EnumWakfuStat.CriticalMastery,
    label: "Maîtrise critique",
    description:
      "La Maîtrise critique s'ajoute à la Maîtrise élémentaire pour amplifier les dommages infligés en coup critique.",
  },
  [EnumAbilities.BackMastery]: {
    icon: EnumWakfuStat.RearMastery,
    label: "Maîtrise dos",
    description:
      "La Maîtrise dos s'ajoute à la Maîtrise élémentaire pour amplifier les dommages infligés dans le dos de la cible.",
  },
  [EnumAbilities.BerserkMastery]: {
    icon: EnumWakfuStat.BerserkMastery,
    label: "Maîtrise berserk",
    description:
      "La Maîtrise berserk s'ajoute à la Maîtrise élémentaire pour amplifier les dommages infligés lorsque vous avez moins de 50% de vos PV max.",
  },
  [EnumAbilities.HealingMastery]: {
    icon: EnumWakfuStat.HealingMastery,
    label: "Maîtrise soin",
    description: "La Maîtrise soin s'ajoute à la Maîtrise élémentaire pour augmenter l'efficacité des sorts de soins.",
  },
  [EnumAbilities.BackResistance]: {
    icon: EnumWakfuStat.RearResistance,
    label: "Résistance dos",
    description: "La Résistance dos diminue les dégâts des attaques subies dans le dos.",
  },
  [EnumAbilities.CriticalResistance]: {
    icon: EnumWakfuStat.CriticalResistance,
    label: "Résistance critique",
    description: "La Résistance critique diminue les dommages des attaques critiques subies.",
  },
  [EnumAbilities.Ap]: {
    icon: EnumWakfuStat.ActionPoint,
    label: "Point d'action",
  },
  [EnumAbilities.MpAndMastery]: {
    icon: EnumWakfuStat.MovementPoint,
    label: "Point de mouvement et dégâts",
  },
  [EnumAbilities.RangeAndMastery]: {
    icon: EnumWakfuStat.Range,
    label: "Portée et dégâts",
  },
  [EnumAbilities.Wp]: {
    icon: EnumWakfuStat.WakfuPoint,
    label: "Point de Wakfu",
  },
  [EnumAbilities.ControlAndMastery]: {
    icon: EnumWakfuStat.Control,
    label: "Contrôle et dégâts",
  },
  [EnumAbilities.DamageDealt]: {
    icon: EnumWakfuStat.DamageDealt,
    label: "% Dommages infligés",
    description: "Augmente en pourcentage tous les dommages que vous infligez.",
  },
  [EnumAbilities.MajorResistance]: {
    icon: EnumWakfuStat.ElementalResistance,
    label: "Résistance élémentaire",
    description: "Résistance aux dégâts de tous les éléments.",
  },
};
