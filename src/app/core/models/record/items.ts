import {Trancito} from "@models/record/trancito";

export interface Items {
  id:                 string;
  item:               string;
  nombre:             string;
  cantidad:           number;
  fob:                number;
  proveedor:          number;
  cbm:                number;
  cantidadTrancito:   number;
  status:             string;
  trancitos?:         Trancito[];
}
