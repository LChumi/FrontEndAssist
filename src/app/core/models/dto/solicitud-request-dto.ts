import {Items} from "@models/record/items";

export interface SolicitudRequestDTO {
  empresa:   number;
  tipodoc:   number;
  almacen:   number;
  pventa:    number;
  sigla:     number;
  proveedor: number;
  usuario:   number;
  fecha:     Date;
  modulo:    number;
  items:     Items[];
}
