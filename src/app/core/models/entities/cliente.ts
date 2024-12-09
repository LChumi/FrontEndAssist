export interface Cliente {
  codigo:    number;
  empresa:   number;
  cliId:     string;
  tipo:      number;
  nombre:    string;
  rucCedula: string;
  direccion: string;
  telefono:  null | string;
  telefono2: null | string;
  telefono3: null | string;
  mail:      null | string;
  tipoced:   number;
}
