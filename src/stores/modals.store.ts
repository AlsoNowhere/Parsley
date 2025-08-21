import { Store } from "mint";

import { TModalState } from "thyme";

class ModalsStore extends Store {
  tagsModalState: TModalState;

  constructor() {
    super({
      tagsModalState: "",
    });
  }
}

export const modalsStore = new ModalsStore();
