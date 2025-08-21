import { component, mFor, MintScope, mRef, node } from "mint";

import { PictureWrapper } from "./PictureWrapper.component";

import { pictursStore } from "../../stores/pictures.store";

class PicturesComponent extends MintScope {
  constructor() {
    super();

    pictursStore.connect(this);
  }
}

export const Pictures = component(
  "div",
  PicturesComponent,
  {},
  node(
    "ul",
    { class: "photos", ...mRef("listElementRef") },
    node(
      "li",
      {
        ...mFor("list"),
        mKey: "fileName",
        class: "photos__item",
      },
      node(PictureWrapper, { "[fileName]": "fileName", "[picture]": "_x" }),
    ),
  ),
);
