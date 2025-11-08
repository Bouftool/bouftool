import path from "node:path";
import { BrowserWindow, globalShortcut } from "electron";
import { ElectronEventManager } from "../events/manager";
import { ElectronEvents } from "../types";

export class OverlayWindow {
  private window: BrowserWindow | null = null;
  private static instance: OverlayWindow;
  public static readonly title = "Bouftool Overlay";
  public static readonly toogleOverlayShortcut = "CommandOrControl+Shift+O";
  private isOverlayOn = false;

  private constructor() {}

  public static getInstance(): OverlayWindow {
    if (!OverlayWindow.instance) {
      OverlayWindow.instance = new OverlayWindow();
    }
    return OverlayWindow.instance;
  }

  public static hasInstance(): boolean {
    return !!OverlayWindow.instance;
  }

  public getWindow(): BrowserWindow | null {
    return this.window;
  }

  private toogleOverlay(): void {
    if (!this.window) {
      return;
    }
    this.isOverlayOn = !this.isOverlayOn;

    this.window.setIgnoreMouseEvents(this.isOverlayOn);
    const bounds = this.window.getBounds();
    this.window.setSize(
      this.isOverlayOn ? bounds.width - 65 : bounds.width + 65,
      this.isOverlayOn ? bounds.height - 65 : bounds.height + 65,
    );
    ElectronEventManager.sendTo(ElectronEvents.CraftManagerGetOverlayMode, this.isOverlayOn, OverlayWindow.title);
  }

  public open(): void {
    if (this.window) {
      this.window.show();
      return;
    }

    this.window = new BrowserWindow({
      title: OverlayWindow.title,
      width: 400,
      height: 300,
      movable: true,
      resizable: true,
      hasShadow: false,
      opacity: 1,
      autoHideMenuBar: true,
      frame: false,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        preload: path.join(import.meta.dirname, "../build/preload.js"),
      },
    });

    this.window.setMenuBarVisibility(false);
    this.window.setAlwaysOnTop(true, "screen-saver");

    if (OVERLAY_WINDOW_VITE_DEV_SERVER_URL) {
      this.window.loadURL(`${OVERLAY_WINDOW_VITE_DEV_SERVER_URL}/overlay.html`);
    } else {
      this.window.setMenu(null);
      this.window.loadFile(path.join(import.meta.dirname, `../renderer/overlay.html`));
    }

    this.window.on("closed", () => {
      globalShortcut.unregister(OverlayWindow.toogleOverlayShortcut);
      this.window = null;
    });

    globalShortcut.register(OverlayWindow.toogleOverlayShortcut, this.toogleOverlay.bind(this));
  }

  public close(): void {
    if (this.window) {
      this.window.close();
    }
  }

  public setOpacity(opacity: number): void {
    if (this.window) {
      this.window.setOpacity(opacity);
    }
  }

  public getIsOverlayOn(): boolean {
    return this.isOverlayOn;
  }

  public setIsOverlayOn(isOverlayOn: boolean): void {
    this.isOverlayOn = isOverlayOn;
    if (this.window) {
      this.window.setIgnoreMouseEvents(this.isOverlayOn);
    }
  }
}
