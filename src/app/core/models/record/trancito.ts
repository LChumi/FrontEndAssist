export interface Trancito {
  nroComprobante:    string;
  ccomproba:         string;
  fecha:             string;
  observacion:       string;
  cantidadPedida:    number;
  fob:               number;
  fobTotalPedido:    number;
  fobTotalAprobado:  number;
  tipoDoc:           string;
  seleccionado?:     boolean;
}
