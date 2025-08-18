import { contextBridge, ipcRenderer } from "electron";
import type { ElectronAPI } from "./electron/types";

contextBridge.exposeInMainWorld("electron", {
  send: (event, payload) => {
    return ipcRenderer.invoke(event, payload);
  },
  receive: (event, callback) => {
    ipcRenderer.on(event, (_, payload) => {
      callback(payload);
    });
  },
} satisfies ElectronAPI);
