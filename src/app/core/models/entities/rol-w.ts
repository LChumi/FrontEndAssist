import {Seguridad} from "@models/entities/seguridad";

export interface RolW {
  id:        number;
  rlwId:     string;
  nombre:    string;
  seguridad: Seguridad;
}
