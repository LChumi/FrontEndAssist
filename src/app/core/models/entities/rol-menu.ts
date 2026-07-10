import {MenuW} from "@models/entities/menu-w";
import {RolW} from "@models/entities/rol-w";

export interface RolMenu {
  id:    number;
  rolW:  RolW;
  menuW: MenuW;
}
