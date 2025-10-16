import { component, MintScope, node } from "mint";

import { Header } from "./structure/Header.component";
import { Main } from "./structure/Main.component";
import { Modals } from "./structure/Modals.component";

import { appStore } from "../stores/app.store";

class AppComponent extends MintScope {
  constructor() {
    super();

    appStore.connect(this);
  }
}

export const App = component("<>", AppComponent, null, [node(Header), node(Main), node(Modals)]);
