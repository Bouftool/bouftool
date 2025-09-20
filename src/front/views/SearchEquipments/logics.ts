import { useEffect, useState } from "react";
import type { TSearchItemsFilters, TSearchItemsSort } from "src/electron/searchItems/types";
import { ElectronEvents } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";

export const useWakfuSearchItems = () => {
  const [send, items] = useElectronEvent(ElectronEvents.SearchItems);
  const [filters, setFilters] = useState<TSearchItemsFilters>({
    title: "",
    itemTypes: [],
    rarities: [],
    levels: { min: 1, max: 245 },
    stats: [],
  });
  const [sort, setSort] = useState<TSearchItemsSort>({
    mastery: {
      elementsPriority: [],
      meleeMastery: false,
      distanceMastery: false,
      criticalMastery: false,
      rearMastery: false,
      berserkMastery: false,
      healingMastery: false,
    },
    resistance: {
      elementsPriority: [],
    },
  });

  useEffect(() => {
    send({ filters, sort });
  }, [send, filters, sort]);

  return { items: items || [], filters, setFilters, sort, setSort };
};
