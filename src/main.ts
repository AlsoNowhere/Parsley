import { app, component, MintScope, node } from "mint";

import { wait } from "sage";

import { Main } from "./components/structure/Main.component";
import { Header } from "./components/structure/Header.component";
import { Modals } from "./components/structure/Modals.component";

import { appStore } from "./stores/app.store";

class AppComponent extends MintScope {
  constructor() {
    super();

    appStore.connect(this);
  }
}

const App = component("<>", AppComponent, null, [node(Header), node(Main), node(Modals)]);

app(document.body, {}, [node(App)]);
