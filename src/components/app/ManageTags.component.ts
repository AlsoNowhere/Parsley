import { component, div, mFor, mIf, MintEvent, MintScope, mRef, node, refresh, Resolver, span } from "mint";

import { Button, Field, TField } from "thyme";

import { toast, wait } from "sage";

import { saveData } from "../../logic/save.logic";

import { appStore } from "../../stores/app.store";
import { modalsStore } from "../../stores/modals.store";

class ManageTagsComponent extends MintScope {
  tags: Array<string>;

  noTags: Resolver<boolean>;

  formElementRef: null | HTMLFormElement;

  onSubmit: MintEvent<HTMLFormElement>;
  deleteTag: () => void;

  constructor() {
    super();

    const that = this;

    this.tags = [];

    this.noTags = new Resolver(function () {
      return this.tags.length === 0;
    });

    this.formElementRef = null;

    this.oneach = function () {
      if (modalsStore.tagsModalState !== "open") return;

      (async () => {
        await wait();

        this.formElementRef.elements["tag"]?.focus();
      })();
    };

    this.onSubmit = (event, element) => {
      event.preventDefault();

      const { currentDir, currentPicture } = appStore;

      // ** If we have a situation where the data is not set (not loaded) then do nothing.
      if (currentDir === null || currentPicture === null) return;

      const { fullLocation } = currentPicture;

      // ** Get the Tag value from the field.
      const field = element.elements["tag"];

      // ** We want all tags to be consistent so we alter the value here.
      const value = field.value.toLowerCase();

      // ** Here we check for spaces. Spaces are not allowed in tags and so the user gets a message
      // ** and a warning toast only.
      if (value.includes(" ")) {
        toast("Tags cannot includes spaces. Use underscore instead", "orange");
        return;
      }

      // ** Reset the form field manually.
      field.value = "";

      // ** Here we check if the tag is already on the photo and if so then we send a message to the user
      // ** and then go no further to prevent duplicates.
      if (this.tags.includes(value)) {
        toast("Tags already exists.", "tomato");
        return;
      }

      this.tags.push(value);

      // ** Create a place in the data so it can be saved.
      if (currentDir.tags[fullLocation] === undefined) {
        currentDir.tags[fullLocation] = this.tags;
      }

      saveData();

      refresh(that);
    };

    this.deleteTag = function () {
      const index = this.tags.indexOf(this.tag);
      this.tags.splice(index, 1);

      saveData();

      refresh(that);
    };
  }
}

export const ManageTags = component("<>", ManageTagsComponent, {}, [
  node("form", { "(submit)": "onSubmit", ...mRef("formElementRef") }, [
    node<TField>(Field, { name: "tag", required: true }),

    node(Button, { type: "submit", theme: "blueberry", label: "Add", large: true }),
  ]),

  node("ul", { class: "tags__list" }, [
    node("li", { ...mIf("noTags"), class: "tags__item" }, " - no tags - "),
    node("li", { ...mFor("tags"), mKey: "_x", class: "tags__item" }, [
      div({ class: "tags__item-container" }, [
        span({ class: "tags__item-text" }, "{_x}"),

        node(Button, {
          theme: "tomato",
          icon: "trash-o",
          square: true,
          "[onClick]": "deleteTag",
          "[tag]": "_x",
          "[tags]": "tags",
        }),
      ]),
    ]),
  ]),
]);
