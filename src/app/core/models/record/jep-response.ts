export interface JepResponse {
  data:              Data;
  codigoTransaccion: string;
  mensaje:           string;
  errores:           any[];
}

export interface Data {
  qr: string;
}
