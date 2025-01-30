import {DfacturaDto} from "@models/dto/dfactura-dto";
import {ClienteDto} from "@models/dto/cliente-dto";

export interface SolicitudCompraImportacionDto {
  cco:         number;
  almacen:     string;
  almacenId:   string;
  fecha:       Date;
  sigla:       string;
  documento:   string;
  concepto:    string;
  comprobante: string;
  cliente:     ClienteDto;
  items:       DfacturaDto[];
}
