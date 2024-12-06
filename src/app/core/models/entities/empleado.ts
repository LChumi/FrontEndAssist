export interface Empleado {
  id:             ID;
  empId:          string;
  nombre:         string;
  inactivo:       null;
  detalle:        null;
  rucCedula:      string;
  direccion:      string;
  telefono1:      string;
  telefono2:      string;
  telefono3:      null;
  mail:           string;
  contrato:       number;
  sueldo:         number;
  cargo:          number;
  sexo:           boolean;
  numcargas:      null;
  cargsubescol:   null;
  bannom:         null;
  tcuenta:        null;
  cuenta:         null;
  libmilitar:     null;
  codiess:        null;
  actaiess:       null;
  libahorro:      null;
  fechanac:       Date;
  fechaing:       Date;
  fecharet:       null;
  anticipo:       number;
  tipolic:        null;
  fechalic:       null;
  tipoced:        string;
  comision:       boolean;
  fechaVac:       Date;
  salida:         null;
  instruccion:    null;
  telefono4:      null;
  calculoHora:    null;
  movilizacion:   null;
  fondoRe:        boolean;
  camcentro:      null;
  manoObra:       boolean;
  impRenta:       null;
  usuario:        number;
  seccion:        null;
  decimoXiii:     boolean;
  decimoXiv:      boolean;
  extSaludConyug: boolean;
  mailEmpresa:    string;
  provXiii:       null;
  provXiv:        null;
}

export interface ID {
  codigo:  number;
  empresa: number;
}
