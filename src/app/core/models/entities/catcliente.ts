export interface Catcliente {
  id:          ID;
  catId:       string;
  catNombre:   string;
  catOrden:    number;
  catInactivo: boolean;
  catTipo:     boolean;
  reporta:     null;
  umedida:     null;
  listaPre:    null;
}

export interface ID {
  empresa: number;
  codigo:  number;
}
