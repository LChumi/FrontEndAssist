export interface ImpProdTrancitoVw {
  id:             number;
  empresa:        number;
  ccoComproba:    number;
  nroComprobante: string;
  fecha:          Date;
  proveedor:      number;
  proCodigo:      number;
  proId:          string;
  proId1:         string;
  proNombre:      string;
  facFlete:       null;
  nroGuia:        null;
  observacion:    string;
  nroPoliza:      null;
  cantPedida:     number;
  cantLlegada:    number;
  fob:            number;
  fobTotal:       number;
  estado:         string;
  tipoDoc:        string;
}
