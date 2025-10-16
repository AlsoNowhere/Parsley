import { openFolder } from "../logic/openFolder.logic";

import { appStore } from "../stores/app.store";

import { Tool } from "../models/Tool.model";

const eye = () => {
  if (appStore.appPending) return;
};

export const tools = [new Tool("black", "download", openFolder), new Tool("black", "floppy-o", eye)];
