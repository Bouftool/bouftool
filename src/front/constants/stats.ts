import { WakfuStats } from "src/wakfu/types/action";
import type { TWakfuDescription } from "src/wakfu/types/description";

export const wakfuStatsLabels: Record<WakfuStats, { title: TWakfuDescription; effect: TWakfuDescription }> = {
  [WakfuStats.PV]: {
    title: { fr: "PV", en: "HP", es: "PV", pt: "PV" },
    effect: { fr: "PV", en: "HP", es: "PV", pt: "PV" },
  },
  [WakfuStats.PW]: {
    title: { fr: "PW", en: "WP", es: "PW", pt: "PW" },
    effect: { fr: "PW", en: "WP", es: "PW", pt: "PW" },
  },
  [WakfuStats.PA]: {
    title: { fr: "PA", en: "PA", es: "PA", pt: "PA" },
    effect: { fr: "PA", en: "PA", es: "PA", pt: "PA" },
  },
  [WakfuStats.PM]: {
    title: { fr: "PM", en: "PM", es: "PM", pt: "PM" },
    effect: { fr: "PM", en: "PM", es: "PM", pt: "PM" },
  },
  [WakfuStats.Mastery]: {
    title: { fr: "Maîtrise Élémentaire", en: "Elemental Mastery", es: "Maestría Elemental", pt: "Maestria Elemental" },
    effect: { fr: "Maîtrise Élémentaire", en: "Elemental Mastery", es: "Maestría Elemental", pt: "Maestria Elemental" },
  },
  [WakfuStats.MasteryFire]: {
    title: { fr: "Maîtrise Feu", en: "Fire Mastery", es: "Maestría Fuego", pt: "Maestria Fogo" },
    effect: { fr: "Maîtrise Feu", en: "Fire Mastery", es: "Maestría Fuego", pt: "Maestria Fogo" },
  },
  [WakfuStats.MasteryEarth]: {
    title: { fr: "Maîtrise Terre", en: "Earth Mastery", es: "Maestría Tierra", pt: "Maestria Terra" },
    effect: { fr: "Maîtrise Terre", en: "Earth Mastery", es: "Maestría Tierra", pt: "Maestria Terra" },
  },
  [WakfuStats.MasteryWater]: {
    title: { fr: "Maîtrise Eau", en: "Water Mastery", es: "Maestría Agua", pt: "Maestria Água" },
    effect: { fr: "Maîtrise Eau", en: "Water Mastery", es: "Maestría Agua", pt: "Maestria Água" },
  },
  [WakfuStats.MasteryAir]: {
    title: { fr: "Maîtrise Air", en: "Air Mastery", es: "Maestría Aire", pt: "Maestria Ar" },
    effect: { fr: "Maîtrise Air", en: "Air Mastery", es: "Maestría Aire", pt: "Maestria Ar" },
  },
  [WakfuStats.Resistance]: {
    title: {
      fr: "Résistance Élémentaire",
      en: "Elemental Resistance",
      es: "Resistencia Elemental",
      pt: "Resistência Elemental",
    },
    effect: {
      fr: "Résistance Élémentaire",
      en: "Elemental Resistance",
      es: "Resistencia Elemental",
      pt: "Resistência Elemental",
    },
  },
  [WakfuStats.ResistanceFire]: {
    title: { fr: "Résistance Feu", en: "Fire Resistance", es: "Resistencia Fuego", pt: "Resistência Fogo" },
    effect: { fr: "Résistance Feu", en: "Fire Resistance", es: "Resistencia Fuego", pt: "Resistência Fogo" },
  },
  [WakfuStats.ResistanceWater]: {
    title: { fr: "Résistance Eau", en: "Water Resistance", es: "Resistencia Agua", pt: "Resistência Água" },
    effect: { fr: "Résistance Eau", en: "Water Resistance", es: "Resistencia Agua", pt: "Resistência Água" },
  },
  [WakfuStats.ResistanceEarth]: {
    title: { fr: "Résistance Terre", en: "Earth Resistance", es: "Resistencia Tierra", pt: "Resistência Terra" },
    effect: { fr: "Résistance Terre", en: "Earth Resistance", es: "Resistencia Tierra", pt: "Resistência Terra" },
  },
  [WakfuStats.ResistanceAir]: {
    title: { fr: "Résistance Air", en: "Air Resistance", es: "Resistencia Aire", pt: "Resistência Ar" },
    effect: { fr: "Résistance Air", en: "Air Resistance", es: "Resistencia Aire", pt: "Resistência Ar" },
  },
  [WakfuStats.CriticalRate]: {
    title: { fr: "Coup Critique", en: "Critical Hit", es: "Golpe Crítico", pt: "Golpe Crítico" },
    effect: { fr: "% Coup Critique", en: "% Critical Hit", es: "% Golpe Crítico", pt: "% Golpe Crítico" },
  },
  [WakfuStats.Initiative]: {
    title: { fr: "Initiative", en: "Initiative", es: "Iniciativa", pt: "Iniciativa" },
    effect: { fr: "Initiative", en: "Initiative", es: "Iniciativa", pt: "Iniciativa" },
  },
  [WakfuStats.Dodge]: {
    title: { fr: "Esquive", en: "Dodge", es: "Esquivar", pt: "Esquiva" },
    effect: { fr: "Esquive", en: "Dodge", es: "Esquivar", pt: "Esquiva" },
  },
  [WakfuStats.Control]: {
    title: { fr: "Contrôle", en: "Control", es: "Control", pt: "Controle" },
    effect: { fr: "Contrôle", en: "Control", es: "Control", pt: "Controle" },
  },
  [WakfuStats.Block]: {
    title: { fr: "Parade", en: "Block", es: "Bloquear", pt: "Bloquear" },
    effect: { fr: "% Parade", en: "% Block", es: "% Bloquear", pt: "% Bloquear" },
  },
  [WakfuStats.Range]: {
    title: { fr: "Portée", en: "Range", es: "Alcance", pt: "Alcance" },
    effect: { fr: "Portée", en: "Range", es: "Alcance", pt: "Alcance" },
  },
  [WakfuStats.Lock]: {
    title: { fr: "Tacle", en: "Lock", es: "Tacle", pt: "Tacle" },
    effect: { fr: "Tacle", en: "Lock", es: "Tacle", pt: "Tacle" },
  },
  [WakfuStats.Willpower]: {
    title: { fr: "Volonté", en: "Willpower", es: "Voluntad", pt: "Vontade" },
    effect: { fr: "Volonté", en: "Willpower", es: "Voluntad", pt: "Vontade" },
  },
  [WakfuStats.CriticalMastery]: {
    title: { fr: "Maîtrise Critique", en: "Critical Mastery", es: "Maestría Crítica", pt: "Maestria Crítica" },
    effect: { fr: "Maîtrise Critique", en: "Critical Mastery", es: "Maestría Crítica", pt: "Maestria Crítica" },
  },
  [WakfuStats.CriticalResistance]: {
    title: {
      fr: "Résistance Critique",
      en: "Critical Resistance",
      es: "Resistencia Crítica",
      pt: "Resistência Crítica",
    },
    effect: {
      fr: "Résistance Critique",
      en: "Critical Resistance",
      es: "Resistencia Crítica",
      pt: "Resistência Crítica",
    },
  },
  [WakfuStats.BackMastery]: {
    title: { fr: "Maîtrise Dos", en: "Rear Mastery", es: "Maestría Espalda", pt: "Maestria Costas" },
    effect: { fr: "Maîtrise Dos", en: "Rear Mastery", es: "Maestría Espalda", pt: "Maestria Costas" },
  },
  [WakfuStats.BackResistance]: {
    title: { fr: "Résistance Dos", en: "Rear Resistance", es: "Resistencia Espalda", pt: "Resistência Costas" },
    effect: { fr: "Résistance Dos", en: "Rear Resistance", es: "Resistencia Espalda", pt: "Resistência Costas" },
  },
  [WakfuStats.MeleeMastery]: {
    title: { fr: "Maîtrise Mêlée", en: "Melee Mastery", es: "Maestría Cuerpo a Cuerpo", pt: "Maestria Corpo a Corpo" },
    effect: { fr: "Maîtrise Mêlée", en: "Melee Mastery", es: "Maestría Cuerpo a Cuerpo", pt: "Maestria Corpo a Corpo" },
  },
  [WakfuStats.DistanceMastery]: {
    title: { fr: "Maîtrise Distance", en: "Ranged Mastery", es: "Maestría A Distancia", pt: "Maestria à Distância" },
    effect: { fr: "Maîtrise Distance", en: "Ranged Mastery", es: "Maestría A Distancia", pt: "Maestria à Distância" },
  },
  [WakfuStats.ArmorGiven]: {
    title: { fr: "Armure Donnée", en: "Armor Given", es: "Armadura Dada", pt: "Armadura Dada" },
    effect: { fr: "% Armure Donnée", en: "% Armor Given", es: "% Armadura Dada", pt: "% Armadura Dada" },
  },
  [WakfuStats.ArmorReceived]: {
    title: { fr: "Armure Reçue", en: "Armor Received", es: "Armadura Recibida", pt: "Armadura Recebida" },
    effect: { fr: "% Armure Reçue", en: "% Armor Received", es: "% Armadura Recibida", pt: "% Armadura Recebida" },
  },
  [WakfuStats.HealingMastery]: {
    title: { fr: "Maîtrise Soins", en: "Healing Mastery", es: "Maestría en Curación", pt: "Maestria em Cura" },
    effect: { fr: "Maîtrise Soins", en: "Healing Mastery", es: "Maestría en Curación", pt: "Maestria em Cura" },
  },
  [WakfuStats.BerserkMastery]: {
    title: { fr: "Maîtrise Berserk", en: "Berserk Mastery", es: "Maestría Berserk", pt: "Maestria Berserk" },
    effect: { fr: "Maîtrise Berserk", en: "Berserk Mastery", es: "Maestría Berserk", pt: "Maestria Berserk" },
  },
  [WakfuStats.FinalDamage]: {
    title: { fr: "Dommages infligés", en: "Damage Dealt", es: "Daño Infligido", pt: "Dano Infligido" },
    effect: { fr: "% Dommages infligés", en: "% Damage Dealt", es: "% Daño Infligido", pt: "% Dano Infligido" },
  },
  [WakfuStats.FinalHealing]: {
    title: { fr: "Soins réalisés", en: "Healing Done", es: "Curación Realizada", pt: "Cura Realizada" },
    effect: { fr: "% Soins réalisés", en: "% Healing Done", es: "% Curación Realizada", pt: "% Cura Realizada" },
  },
  [WakfuStats.Wisdom]: {
    title: { fr: "Sagesse", en: "Wisdom", es: "Sabiduría", pt: "Sabedoria" },
    effect: { fr: "Sagesse", en: "Wisdom", es: "Sabiduría", pt: "Sabedoria" },
  },
  [WakfuStats.Prospection]: {
    title: { fr: "Prospection", en: "Prospection", es: "Prospección", pt: "Prospeção" },
    effect: { fr: "Prospection", en: "Prospection", es: "Prospección", pt: "Prospeção" },
  },
  [WakfuStats.IndirectDamages]: {
    title: { fr: "Dommages Indirects", en: "Indirect Damages", es: "Daños Indirectos", pt: "Danos Indiretos" },
    effect: { fr: "% Dommages Indirects", en: "% Indirect Damages", es: "% Daños Indirectos", pt: "% Danos Indiretos" },
  },
  [WakfuStats.HealingReceived]: {
    title: { fr: "Soins Reçus", en: "Healing Received", es: "Curación Recibida", pt: "Cura Recebida" },
    effect: { fr: "% Soins Reçus", en: "% Healing Received", es: "% Curación Recibida", pt: "% Cura Recebida" },
  },
  [WakfuStats.Armor]: {
    title: { fr: "Armure", en: "Armor", es: "Armadura", pt: "Armadura" },
    effect: { fr: "Armure", en: "Armor", es: "Armadura", pt: "Armadura" },
  },
  [WakfuStats.PercentHp]: {
    title: { fr: "Pourcentage de PV", en: "Percent HP", es: "Porcentaje de PV", pt: "Porcentagem de PV" },
    effect: { fr: "% Points de vie", en: "% HP", es: "% PV", pt: "% PV" },
  },
  [WakfuStats.PercentHpToArmor]: {
    title: {
      fr: "Pourcentage de PV à l'Armure",
      en: "Percent HP to Armor",
      es: "Porcentaje de PV a la Armadura",
      pt: "Porcentagem de PV à Armadura",
    },
    effect: {
      fr: "% de la vie en armure",
      en: "% HP to Armor",
      es: "% PV a la Armadura",
      pt: "% PV à Armadura",
    },
  },
  [WakfuStats.Barrier]: {
    title: {
      fr: "fois par tour, réduit les dégâts subit de 50% du niveau",
      en: "once per turn, reduces damage taken by 50% of the level",
      es: "una vez por turno, reduce el daño recibido en un 50% del nivel",
      pt: "uma vez por turno, reduz o dano recebido em 50% do nível",
    },
    effect: {
      fr: "fois par tour, réduit les dégâts subit de 50% du niveau",
      en: "once per turn, reduces damage taken by 50% of the level",
      es: "una vez por turno, reduce el daño recibido en un 50% del nivel",
      pt: "uma vez por turno, reduz o dano recebido em 50% do nível",
    },
  },
};

export const getWakfuStatsTitleLabel = (stat: WakfuStats) => {
  return wakfuStatsLabels[stat].title.fr;
};

export const getWakfuStatsEffectLabel = (stat: WakfuStats) => {
  if (wakfuStatsLabels[stat].effect.fr.startsWith("%")) {
    return wakfuStatsLabels[stat].effect.fr;
  }
  return ` ${wakfuStatsLabels[stat].effect.fr}`;
};
