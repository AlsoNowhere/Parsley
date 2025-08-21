import { appStore } from "../stores/app.store";

import { ISaveData } from "../interfaces/ISaveData.interface";

import { storageKey } from "../data/constants.data";

export const saveData = () => {
  const { allDirs, defaultFolder } = appStore;

  const data: ISaveData = { allDirs };

  if (defaultFolder !== null) {
    data.defaultFolder = defaultFolder;
  }

  localStorage.setItem(storageKey, JSON.stringify(data));
};
