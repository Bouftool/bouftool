import type { TSearchItemsPayload, TSearchItemsResult } from "src/wakfu/search/types";
import type { WakfuLang } from "src/wakfu/types/utils";

export enum ElectronEvents {
  AppReady = "app:ready",
  SearchItems = "app:search-items",
  GetItemTypeLabels = "app:get-itemtype-labels",
}

export type ElectronEventsMain = {
  [ElectronEvents.AppReady]: undefined;
  [ElectronEvents.SearchItems]: TSearchItemsPayload;
  [ElectronEvents.GetItemTypeLabels]: undefined;
};

export type ElectronEventsRenderer = {
  [ElectronEvents.AppReady]: { version: string; lang: WakfuLang };
  [ElectronEvents.SearchItems]: TSearchItemsResult[];
  [ElectronEvents.GetItemTypeLabels]: Record<number, string>;
};

export interface ElectronAPI {
  send: <Event extends ElectronEvents>(event: Event, payload: ElectronEventsMain[Event]) => void;
  receive: <Event extends ElectronEvents>(
    event: Event,
    callback: (payload: ElectronEventsRenderer[Event]) => void,
  ) => void;
}
