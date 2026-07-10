import {ProgramaW} from "@models/entities/programa-w";
import {Seguridad} from "@models/entities/seguridad";

export interface MenuW {
  id:        number;
  mnwId:     string;
  inactivo:  boolean;
  nombre:    string;
  icono:     string;
  reporta:   number | null;
  orden:     number;
  programa:  ProgramaW | null;
  seguridad: Seguridad;
  menuW:     MenuW | null;
}
