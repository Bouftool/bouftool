import { contextBridge, type IpcRendererEvent, ipcRenderer } from "electron";
import type { ElectronAPI, ElectronEventsRenderer, TElectronPackage } from "./electron/types";

try {
  contextBridge.exposeInMainWorld("electron", {
    send: (event, payload) => {
      return ipcRenderer.invoke(event, payload);
    },
    addListener: (event, callback) => {
      const wrapper = (_: IpcRendererEvent, payload: TElectronPackage<ElectronEventsRenderer[typeof event]>) => {
        callback(payload);
      };
      ipcRenderer.on(event, wrapper);
      return wrapper;
    },
    removeListener: (event, callback) => {
      ipcRenderer.removeListener(event, callback);
    },
  } satisfies ElectronAPI);
} catch (error) {
  console.error("Error in preload script:", error);
}
