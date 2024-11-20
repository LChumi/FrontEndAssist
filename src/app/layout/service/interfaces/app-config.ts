import {ColorScheme} from "@layout/service/interfaces/color-scheme";
import {MenuMode} from "@layout/service/interfaces/menu-mode";
import {MenuColorScheme} from "@layout/service/interfaces/menu-color-scheme";

export interface AppConfig {
  inputStyle: string;
  colorScheme: ColorScheme;
  theme: string;
  ripple: boolean;
  menuMode: MenuMode;
  scale: number;
  menuTheme: MenuColorScheme;
}
