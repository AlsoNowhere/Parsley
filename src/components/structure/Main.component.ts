import { component, MintScope, node } from "mint";

import { Toolbar } from "../app/Toolbar.component";
import { Pictures } from "../app/Pictures.component";

class MainComponent extends MintScope {
  constructor() {
    super();
  }
}

export const Main = component("main", MainComponent, {}, [node(Toolbar), node(Pictures)]);
