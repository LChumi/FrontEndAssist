import {DfacturaDto} from "@models/dto/dfactura-dto";

export interface SolicitudCompraImportacionDto {
  cco:       number;
  almacen:   string;
  almacenId: string;
  fecha:     Date;
  sigla:     string;
  docuento:  string;
  concepto:  string;
  items:     DfacturaDto[];
}
