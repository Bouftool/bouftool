import { ElectronEvents } from "src/electron/types";
import { WakfuBuild } from "src/wakfu/builds/build";
import { ElectronEventManager } from "../manager";

export const registerElectronBuildsAbilitiesEvents = (manager: ElectronEventManager) => {
  manager.register(ElectronEvents.BuildSetPreferences, (reply, { buildId, preferences }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.setElementalPreferences(preferences);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildAddAbilityLevel, (reply, { buildId, ability, level }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.addAbilityLevel(ability, level);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildRemoveAbilityLevel, (reply, { buildId, ability, level }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.removeAbilityLevel(ability, level);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildSetAbilitiesFromCode, (reply, { buildId, abilitiesCode }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.setAbilitiesFromCode(abilitiesCode);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });
};
