import { Resolver, Store } from "mint";

import { filterPicturesByTags } from "../logic/filterPicturesByTags.logic";

import { appStore } from "./app.store";

import { Picture } from "../models/Picture.model";

class PicturesStore extends Store {
  list: Array<Picture>;
  resolvedList: Resolver<Array<Picture>>;
  listElementRef: HTMLElement;

  constructor() {
    super({
      list: [],
      resolvedList: new Resolver(() => filterPicturesByTags(picturesStore.list, appStore.tags)),
      listElementRef: null,
    });
  }
}

export const picturesStore = new PicturesStore();
