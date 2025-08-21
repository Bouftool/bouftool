export const getStatsAvailablePoints = (level: number) => {
  return {
    intelligence: Math.max(0, Math.floor((level - 2) / 4) + 1),
    strength: Math.max(0, Math.floor((level - 3) / 4) + 1),
    agility: Math.max(0, Math.floor((level - 4) / 4) + 1),
    chance: Math.max(0, Math.floor((level - 5) / 4) + 1),
    major: Math.max(0, Math.floor((level - 25) / 50) + 1),
  };
};
