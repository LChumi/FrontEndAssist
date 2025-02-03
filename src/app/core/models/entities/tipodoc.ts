import {Modulo} from "@models/entities/modulo";

export interface Tipodoc {
  id:         number;
  tpdId:      string;
  nombre:     string;
  linea:      null;
  nroCopia:   number;
  nocontable: boolean;
  nivelAprob: null;
  sri:        null;
  tabla:      string;
  modulo:     Modulo;
}
