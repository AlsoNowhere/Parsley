import { component, div, MintScope, node } from "mint";

import { Button, closeModal, Modal, TModal } from "thyme";

import { ManageTags } from "../app/ManageTags.component";

import { modalsStore } from "../../stores/modals.store";
import { appStore } from "../../stores/app.store";

class TagsManagementComponent extends MintScope {
  tags: Array<string>;

  close: () => void;

  constructor() {
    super();

    this.tags = [];

    this.oneach = function () {
      const { currentDir, currentPicture } = appStore;
      if (currentDir === null || currentPicture === null) return;
      this.tags = appStore.currentDir.tags[currentPicture.fullLocation] ?? [];

      console.log("Tags: ", this.tags, appStore);
    };

    this.close = () => {
      closeModal(modalsStore, "tagsModalState");
    };
  }
}

export const TagsManagement = component(
  "<>",
  TagsManagementComponent,
  {},
  node<TModal>(
    Modal,
    {
      "[state]": "tagsModalState",
      title: "Tags",
      theme: "tomato",
      "[close]": "close",
      "[tags]": "tags",
    },
    div({ class: "padding" }, [
      node(ManageTags, { "[tags]": "tags" }),

      node(Button, { theme: "tomato", label: "Close", large: true, "[onClick]": "close" }),
    ]),
  ),
);
