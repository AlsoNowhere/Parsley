import { refresh } from "mint";

import { appStore } from "../stores/app.store";
import { pictursStore } from "../stores/pictures.store";

import { Picture } from "../models/Picture.model";
import { DirInfo } from "../models/DirInfo.model";

export const openFolder = function () {
  if (appStore.appPending) return;
  const event = new CustomEvent("selectFolder");
  window.dispatchEvent(event);
};

type TItem = string | [string, TItem];

const getList = (dir: string, pictureList: Array<TItem>, arr: Array<[string, string]> = []) => {
  for (let x of pictureList) {
    if (typeof x === "string") {
      arr.push([x, dir]);
    } else {
      const [folder, list] = x;
      getList(dir + "\\" + folder, list as Array<TItem>, arr);
    }
  }

  return arr;
};

export const onFolderOpen = (event: CustomEvent) => {
  const {
    detail: { folder, pictureList },
  } = event;

  if (folder === undefined || pictureList === undefined) return;

  const list = getList(folder, pictureList);

  let dirInfo: DirInfo | undefined = appStore.allDirs[folder];

  if (dirInfo === undefined) {
    dirInfo = new DirInfo();
    appStore.allDirs[folder] = dirInfo;
  }

  appStore.currentDir = dirInfo;
  appStore.currentFolder = folder;

  pictursStore.list = list.map(([fileName, folder]) => new Picture(fileName, folder));

  refresh(pictursStore);
};
