import { Store } from "mint";

import { Picture } from "../models/Picture.model";
import { DirInfo } from "../models/DirInfo.model";
import { loadData } from "../logic/load.logic";
import { onFolderOpen } from "../logic/open-folder.logic";

import { ISaveData } from "../interfaces/ISaveData.interface";

class AppStore extends Store {
  appPending: boolean;
  allDirs: ISaveData["allDirs"];
  currentDir: null | DirInfo;
  defaultFolder: null | string;
  currentFolder: string;
  currentPicture: null | Picture;

  constructor() {
    super({
      appPending: false,
      allDirs: {},
      currentDir: null,
      defaultFolder: null,
      currentFolder: null,
      currentPicture: null,

      oninit: async () => {
        appStore.appPending = true;

        // ** Here we set the function that runs when a folder is chosen.
        window.addEventListener("folderSelected", onFolderOpen);

        await loadData();

        appStore.appPending = false;
      },
    });
  }
}

export const appStore = new AppStore();
