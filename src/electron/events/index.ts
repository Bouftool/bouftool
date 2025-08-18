import { WakfuData } from "src/wakfu/data";
import { searchItems } from "src/wakfu/search";
import { ElectronEvents } from "../types";
import { ElectronEventManager } from "./manager";

const manager = new ElectronEventManager();
export const registerElectronEvents = () => {
  manager.register(ElectronEvents.AppReady, async (reply) => {
    const wakfuData = await WakfuData.initialize();
    reply({
      version: wakfuData.getVersion(),
      lang: wakfuData.getLang(),
    });
  });

  manager.register(ElectronEvents.SearchItems, (reply, { filters, sort }) => {
    const results = searchItems(filters, sort);
    reply(results);
  });

  manager.register(ElectronEvents.GetItemTypeLabels, (reply) => {
    const wakfuData = WakfuData.getInstance();
    const labels = wakfuData.getItemTypeLabels();
    const map: Record<number, string> = {};
    for (const [id, description] of labels.entries()) {
      map[id] = description[wakfuData.getLang()];
    }
    reply(map);
  });
};
