import { BrowserWindow, ipcMain } from "electron";
import type { ElectronEvents, ElectronEventsMain, ElectronEventsRenderer, TElectronPackage } from "../types";

type EventReply<E extends ElectronEvents> = (pkg: ElectronEventsRenderer[E]) => void;
type EventCallback<E extends ElectronEvents> = (reply: EventReply<E>, pkg: ElectronEventsMain[E]) => void;

export class ElectronEventManager {
  static send<E extends ElectronEvents>(event: E, pkg: ElectronEventsRenderer[E]): void {
    const win = BrowserWindow.getAllWindows()[0];
    if (win) {
      win.webContents.send(event, { id: null, payload: pkg });
    }
  }

  static sendTo<E extends ElectronEvents>(event: E, pkg: ElectronEventsRenderer[E], title: string): void {
    const win = BrowserWindow.getAllWindows().find((w) => w.title === title);

    if (win) {
      win.webContents.send(event, { id: null, payload: pkg });
    }
  }

  static sendToMany<E extends ElectronEvents>(event: E, pkg: ElectronEventsRenderer[E], titles: string[]): void {
    const windows = BrowserWindow.getAllWindows().filter((w) => titles.includes(w.title));

    for (const win of windows) {
      win.webContents.send(event, { id: null, payload: pkg });
    }
  }

  public register<E extends ElectronEvents>(event: E, callback: EventCallback<E>): void {
    console.info("registering event:", event);
    ipcMain.handle(event, (evt, pkg: TElectronPackage<ElectronEventsMain[E]>) => {
      console.info("event received:", event, pkg);
      console.time(`Event: ${event}`);
      callback((payload: ElectronEventsRenderer[E]) => {
        evt.sender.send(event, { id: pkg.id, payload });
      }, pkg.payload);
      console.timeEnd(`Event: ${event}`);
    });
  }
}
