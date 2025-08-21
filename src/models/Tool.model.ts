import { TThemes } from "thyme";

export class Tool {
  theme: TThemes;
  icon: string;
  action: () => void;

  constructor(theme: TThemes, icon: string, action: () => void) {
    this.theme = theme;
    this.icon = icon;
    this.action = action;
  }
}
