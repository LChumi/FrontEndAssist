import {Trancito} from "@models/record/trancito";

export interface Items {
  secuencia:          number;
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
  codFabrica:         string;
  trancitos?:         Trancito[];
}
