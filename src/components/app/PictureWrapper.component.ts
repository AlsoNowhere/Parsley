import { component, div, mFor, MintScope, mRef, node, refresh, Resolver, span } from "mint";

import { Button } from "thyme";

import { modalsStore } from "../../stores/modals.store";
import { appStore } from "../../stores/app.store";

import { Picture } from "../../models/Picture.model";

class PictureWrapperComponent extends MintScope {
  imgLoaded: boolean;
  classes: string;
  fileName: string;
  picture: Picture;
  // tags: Resolver<Array<string>>;
  imgElementRef: HTMLImageElement;

  openTags: () => void;

  constructor() {
    super();

    this.imgLoaded = false;
    this.classes = "";
    this.fileName = "";
    this.picture = null;

    // this.tags = new Resolver(function () {
    //   const { currentDir } = appStore;
    //   const { fullLocation } = this.picture;

    //   const tags = currentDir.tags[fullLocation];

    //   return tags ?? [];
    // });

    this.imgElementRef = null;

    this.oninit = async function () {
      // this.tags = this.picture.tags;

      {
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
      }
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

        div({ class: "photo__hover-content" }, [
          div({ class: "photo__tags" }, [
            node("ul", { class: "photo__tag" }, node("li", { ...mFor("tags"), mKey: "_x" }, "{_x}")),
          ]),

          node(Button, {
            theme: "tomato",
            icon: "tag",
            // class: "photo__button",
            square: true,
            large: true,
            "[onClick]": "openTags",
            "[picture]": "picture",
          }),
        ]),
      ],
    ),

    span({ class: "photo__label" }, "{fileName}"),
  ],
);
