import { Store } from "mint";

import { Picture } from "../models/Picture.model";

class PicturesStore extends Store {
  list: Array<Picture>;
  listElementRef: HTMLElement;

  constructor() {
    super({
      list: [],
      listElementRef: null,
    });
  }
}

export const pictursStore = new PicturesStore();
