export interface Empresa {
  id:             number;
  sisId:          string;
  nombre:         string;
  impuestoCompra: number;
  decimal:        boolean;
  exclusivo:      boolean;
  calle:          string;
  numero:         null;
  telefono1:      string;
  telefono2:      string;
  telefono3:      string;
  ciudad:         number;
  email:          string;
  ruc:            string;
  nombrecorto:    string;
  resolucion:     number;
  contabilidad:   string;
  ambiente:       number;
}
