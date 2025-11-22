import os from "node:os";
import { format } from "node:util";
import { app, autoUpdater, dialog, type Event } from "electron";
import log from "electron-log/main";
import pkg from "../../package.json";

const supportedPlatforms = ["darwin", "win32"];
const userAgent = format("%s/%s (%s: %s)", pkg.name, pkg.version, os.platform(), os.arch());

export const updateApp = () => {
  if (!app.isPackaged) {
    console.info("aborting updates since app is in development mode");
    return;
  }

  if (app.isReady()) {
    initUpdater();
  } else {
    app.on("ready", () => initUpdater());
  }
};

const initUpdater = () => {
  // exit early on unsupported platforms, e.g. `linux`
  if (!supportedPlatforms.includes(process?.platform)) {
    log.info(
      `Electron's autoUpdater does not support the '${process.platform}' platform. Ref: https://www.electronjs.org/docs/latest/api/auto-updater#platform-notices`,
    );
    return;
  }

  const feedURL = `https://update.electronjs.org/Bouftool/bouftool/${process.platform}-${process.arch}/${app.getVersion()}`;
  autoUpdater.setFeedURL({
    url: feedURL,
    headers: { "User-Agent": userAgent },
    serverType: "default",
  });

  autoUpdater.on("error", (err) => {
    log.error("updater error");
    log.error(err);
  });

  autoUpdater.on("checking-for-update", () => {
    log.info("checking-for-update");
  });

  autoUpdater.on("update-available", () => {
    log.info("update-available; downloading...");
  });

  autoUpdater.on("update-not-available", () => {
    log.info("update-not-available");
  });

  autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
    log.info("update-downloaded", [event, releaseNotes, releaseName, releaseDate, updateURL]);
    makeUserNotifier({
      event,
      releaseNotes,
      releaseDate,
      releaseName,
      updateURL,
    });
  });

  autoUpdater.checkForUpdates();
  setInterval(
    () => {
      autoUpdater.checkForUpdates();
    },
    60 * 60 * 1000,
  ); // every hour
};

export interface IUpdateInfo {
  event: Event;
  releaseNotes: string;
  releaseName: string;
  releaseDate: Date;
  updateURL: string;
}

const defaultDialogMessages = {
  title: "Application Update",
  detail: "A new version has been downloaded. Restart the application to apply the updates.",
  restartButtonText: "Restart",
  laterButtonText: "Later",
};

const makeUserNotifier = (info: IUpdateInfo) => {
  const { releaseNotes, releaseName } = info;
  const { title, restartButtonText, laterButtonText, detail } = defaultDialogMessages;

  const dialogOpts: Electron.MessageBoxOptions = {
    type: "info",
    buttons: [restartButtonText, laterButtonText],
    title,
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail,
  };

  dialog.showMessageBox(dialogOpts).then(({ response }) => {
    if (response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
};
