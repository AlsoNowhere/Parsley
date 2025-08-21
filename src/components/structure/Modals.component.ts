import { component, MintScope, node } from "mint";

import { TagsManagement } from "../modals/TagsManagement.component";

import { modalsStore } from "../../stores/modals.store";

class ModalsComponent extends MintScope {
  constructor() {
    super();

    modalsStore.connect(this);
  }
}

export const Modals = component("<>", ModalsComponent, {}, [
  node(TagsManagement, {
    "[tagsModalState]": "tagsModalState",
  }),
]);
