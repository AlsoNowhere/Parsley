import { component, mFor, MintEvent, MintScope, node, refresh } from "mint";

import { Button, Field, TButton, TField } from "thyme";

import { styles, wait } from "sage";

import { saveData } from "../../logic/save.logic";

import { appStore } from "../../stores/app.store";

import { Tool } from "../../models/Tool.model";

import { tools } from "../../data/tools.data";
import { picturesStore } from "../../stores/pictures.store";

class ToolbarComponent extends MintScope {
  tools: Array<Tool>;

  saveDefaultLocation: MintEvent<HTMLFormElement>;
  filterTags: MintEvent<HTMLFormElement>;

  constructor() {
    super();

    this.tools = tools;

    this.oninit = async function () {
      await wait();
      const { defaultFolder } = appStore;
      const form: HTMLFormElement = document.forms["default-form"];

      if (!!defaultFolder) {
        form.elements["default-location"].value = defaultFolder;
      }
    };

    this.saveDefaultLocation = (event) => {
      event.preventDefault();
      if (appStore.appPending) return;
      const form: HTMLFormElement = document.forms["default-form"];
      appStore.defaultFolder = form.elements["default-location"].value;
      saveData();
    };

    this.filterTags = function (event) {
      event.preventDefault();
      if (appStore.appPending) return;
      const form: HTMLFormElement = document.forms["tags-form"];
      const { value } = form.elements["tags"];

      appStore.tags = value
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((x) => !!x);

      refresh(picturesStore);
    };
  }
}

export const Toolbar = component("section", ToolbarComponent, { class: "toolbar" }, [
  node(
    "ul",
    { class: "toolbar__list" },
    node(
      "li",
      {
        ...mFor("tools"),
        mKey: "icon",
        class: "toolbar__item",
      },
      node(Button, {
        theme: "empty",
        "[icon]": "icon",
        class: "{theme}-text",
        square: true,
        large: true,
        "[onClick]": "action",
      }),
    ),
  ),

  node("form", { name: "default-form", class: "toolbar__form", "(submit)": "saveDefaultLocation" }, [
    node<TField>(Field, {
      name: "default-location",
      labelClass: "toolbar__form-label",
      class: "toolbar__form-input",
      style: styles({ width: "300px" }),
    }),

    node<TButton>(Button, { type: "submit", theme: "blueberry", icon: "floppy-o", square: true }),
  ]),

  node("form", { name: "tags-form", class: "toolbar__form toolbar__form--tags", "(submit)": "filterTags" }, [
    node<TField>(Field, {
      name: "tags",
      labelClass: "toolbar__form-label",
      class: "toolbar__form-input",
      style: styles({ width: "300px" }),
    }),

    node<TButton>(Button, { type: "submit", theme: "blueberry", icon: "search", square: true }),
  ]),
]);
