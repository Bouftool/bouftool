import { useEffect, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";
import type { TSearchItemsFilters, TSearchItemsSort } from "src/wakfu/search/types";

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
      rangeMastery: false,
      criticalMastery: false,
      backMastery: false,
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
