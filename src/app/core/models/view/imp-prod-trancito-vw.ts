export interface ImpProdTrancitoVw {
  id:               number;
  empresa:          number;
  ccoComproba:      number;
  nroComprobante:   string;
  fecha:            string;
  proveedor:        number;
  proCodigo:        number;
  proId:            string;
  proId1:           string;
  proNombre:        string;
  facFlete:         null;
  nroGuia:          null;
  observacion:      string;
  nroPoliza:        null;
  cantPedida:       number;
  cantLlegada:      number;
  fob:              number;
  fobTotalPedido:   number;
  fobTotalAprobado: number;
  estado:           string;
  tipoDoc:          string;
}
