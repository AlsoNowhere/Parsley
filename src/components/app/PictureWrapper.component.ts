import { component, div, MintScope, mRef, node, refresh, span } from "mint";

import { Button } from "thyme";

import { modalsStore } from "../../stores/modals.store";

import { Picture } from "../../models/Picture.model";
import { appStore } from "../../stores/app.store";

class PictureWrapperComponent extends MintScope {
  imgLoaded: boolean;
  classes: string;
  fileName: string;
  picture: Picture;
  imgElementRef: HTMLImageElement;

  openTags: () => void;

  constructor() {
    super();

    this.imgLoaded = false;
    this.classes = "";
    this.fileName = "";
    this.picture = null;
    this.imgElementRef = null;

    this.oninit = async function () {
      const that = this;
      const img = new Image();
      img.onload = function () {
        that.imgLoaded = true;
        const { clientWidth: width, clientHeight: height } = that.imgElementRef;
        if (width > height) {
          that.classes = "width-full";
        } else {
          that.classes = "height-full";
        }
        refresh(that);
      };
      img.src = this.picture.fullLocation;
    };

    this.openTags = () => {
      modalsStore.tagsModalState = "open";
      appStore.currentPicture = this.picture;
      refresh(modalsStore);
    };
  }
}

export const PictureWrapper = component(
  "div",
  PictureWrapperComponent,
  {
    class: "photo",
  },
  [
    div(
      {
        class: "photo__container",
      },
      [
        node("img", {
          "[src]": "picture.fullLocation",
          class: "photo__image {classes}",
          ...mRef("imgElementRef"),
        }),
      ],
    ),
    span({ class: "photo__label" }, "{fileName}"),

    node(Button, {
      theme: "tomato",
      icon: "tag",
      class: "photo__button",
      square: true,
      large: true,
      "[onClick]": "openTags",
      "[picture]": "picture",
    }),
  ],
);
