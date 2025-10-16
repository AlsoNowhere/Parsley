import { wait } from "sage";

import { appStore } from "../stores/app.store";

import { ISaveData } from "../interfaces/ISaveData.interface";

import { storageKey } from "../data/constants.data";

export const loadData = async () => {
  // ** TO DO: Load from file

  const data = localStorage.getItem(storageKey);
  const parsed: ISaveData = JSON.parse(data ?? '{ "allDirs": {} }');
  const { allDirs, defaultFolder } = parsed;

  appStore.allDirs = allDirs;

  if (defaultFolder !== undefined) {
    appStore.defaultFolder = defaultFolder;

    const event = new CustomEvent("selectFolder", {
      detail: {
        defaultFolder,
      },
    });

    await wait(1000);

    window.dispatchEvent(event);
  }
};
