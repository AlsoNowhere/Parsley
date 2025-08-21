import { component, mFor, MintEvent, MintScope, node } from "mint";

import { Button, Field, TButton, TField } from "thyme";

import { styles, wait } from "sage";

import { saveData } from "../../logic/save.logic";

import { appStore } from "../../stores/app.store";

import { Tool } from "../../models/Tool.model";

import { tools } from "../../data/tools.data";

class ToolbarComponent extends MintScope {
  tools: Array<Tool>;
  saveDefaultLocation: MintEvent<HTMLFormElement>;

  constructor() {
    super();

    this.tools = tools;

    this.saveDefaultLocation = (event) => {
      if (appStore.appPending) return;
      event.preventDefault();
      const form: HTMLFormElement = document.forms["default-form"];
      appStore.defaultFolder = form.elements["default-location"].value;
      saveData();
    };

    this.oninit = async function () {
      await wait();
      const { defaultFolder } = appStore;
      const form: HTMLFormElement = document.forms["default-form"];

      if (!!defaultFolder) {
        form.elements["default-location"].value = defaultFolder;
      }
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
  node("form", { name: "default-form", class: "default-form", "(submit)": "saveDefaultLocation" }, [
    node<TField>(Field, {
      name: "default-location",
      labelClass: "default-form__label",
      class: "default-form__input",
      style: styles({ width: "300px" }),
    }),
    node<TButton>(Button, { type: "submit", theme: "blueberry", icon: "floppy-o", square: true }),
  ]),
]);
