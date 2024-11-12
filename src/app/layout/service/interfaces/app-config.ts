import {ColorScheme} from "./color-scheme";
import {MenuMode} from "./menu-mode";
import {MenuColorScheme} from "./menu-color-scheme";

export interface AppConfig {
  inputStyle: string;
  colorScheme: ColorScheme;
  theme: string;
  ripple: boolean;
  menuMode: MenuMode;
  scale: number;
  menuTheme: MenuColorScheme;
}
