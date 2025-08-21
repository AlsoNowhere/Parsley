import { component, mFor, MintEvent, MintScope, node, refresh, span } from "mint";

import { Button, Field, TField } from "thyme";
import { appStore } from "../../stores/app.store";
import { saveData } from "../../logic/save.logic";

class ManageTagsComponent extends MintScope {
  tags: Array<string>;

  onSubmit: MintEvent<HTMLFormElement>;

  constructor() {
    super();

    this.tags = [];

    this.oneach = function () {
      console.log("Cosy up tags: ", this);
    };

    this.onSubmit = (event, element) => {
      event.preventDefault();

      const { currentDir, currentPicture } = appStore;

      if (currentDir === null || currentPicture === null) return;

      const { fullLocation } = currentPicture;

      const field = element.elements["tag"];

      const { value } = field;
      field.value = "";

      this.tags.push(value);

      if (currentDir.tags[fullLocation] === undefined) {
        currentDir.tags[fullLocation] = this.tags;
      }

      console.log("Fast and loose: ", value, this.tags, this);
      console.log("Store: ", appStore);
      console.log("Current: ", currentDir);

      saveData();

      refresh(this);
    };
  }
}

export const ManageTags = component("div", ManageTagsComponent, {}, [
  node("form", { "(submit)": "onSubmit" }, [
    node<TField>(Field, { name: "tag", required: true }),
    node(Button, { type: "submit", theme: "blueberry", label: "Add" }),
  ]),

  node("ul", { class: "tags" }, node("li", { ...mFor("tags"), mKey: "_x", class: "tags__item" }, span("{_x}"))),
]);
