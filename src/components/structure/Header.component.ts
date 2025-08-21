import { MintScope, component, node, span } from "mint";

import pkg from "../../../package.json";

const lineProps = {
  y1: "4",
  y2: "28",
};

class HeaderComponent extends MintScope {
  headerTitle: string;
  version: string;

  constructor() {
    super();

    this.headerTitle = "Parsley";
    this.version = pkg.version;
  }
}

export const Header = component("header", HeaderComponent, { class: "header" }, [
  node("h1", { class: "header__title" }, [span("{headerTitle}"), span("v{version}")]),
  node("div", { class: "header__container" }, [
    node(
      "button",
      {
        type: "button",
        class: "empty width-large height-large snow-text font-size",
      },
      node("span", {
        class: "block absolute middle width-small height",
      }),
    ),
    node(
      "button",
      {
        type: "button",
        class: "empty width-large height-large",
      },
      node(
        "svg",
        {
          class: "absolute middle width height",
          viewBox: "0 0 32 32",
        },
        [
          node("line", {
            x1: "4",
            x2: "28",
            ...lineProps,
          }),
          node("line", {
            x1: "28",
            x2: "4",
            ...lineProps,
          }),
        ],
      ),
    ),
  ]),
]);
