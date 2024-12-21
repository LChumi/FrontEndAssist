import {Trancito} from "@models/record/trancito";

export interface Items {
  id:                 string;
  item:               string;
  nombre:             string;
  cantidad:           number;
  fob:                number;
  cbm:                number;
  cxb:                number;
  cantidadTotal:      number;
  cbmTotal:           number;
  fobTotal:           number;
  cantidadTrancito:   number;
  status:             string;
  trancitos?:         Trancito[];
}
