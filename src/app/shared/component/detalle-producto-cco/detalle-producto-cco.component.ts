import {Component, inject, Input, OnInit} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {ComprobanteDetalleService} from "@services/api/comprobante-detalle.service";
import {CompraDetalleProductoDto} from "@models/dto/compra-detalle-producto-dto";
import {getSessionItem} from "@utils/storage-utils";
import {DfacturaDto} from "@models/dto/dfactura-dto";

@Component({
  selector: 'app-detalle-producto-cco',
  standalone: true,
    imports: [
        DecimalPipe,
        PrimeTemplate,
        TableModule
    ],
  templateUrl: './detalle-producto-cco.component.html',
  styles: ``
})
export class DetalleProductoCcoComponent implements OnInit {
  @Input() ccoCodigo!: string ;

  private comprobanteDetalleService = inject(ComprobanteDetalleService);

  protected sci : CompraDetalleProductoDto = {} as CompraDetalleProductoDto;

  protected empresa: any
  protected cantidadTotal: any;
  protected subtotal: any;
  protected  loading = false;

  ngOnInit(): void {
    const nombre =getSessionItem('nombreEmpresa')
    if (nombre) {
      this.empresa = nombre;
    }
    if (this.ccoCodigo){
      this.getSci(this.ccoCodigo)
    }
  }

  getSci(cco: any){
    this.loading = true;
    this.comprobanteDetalleService.verSci(cco).subscribe({
      next: data => {
        this.sci = data;
        this.cantidadTotal = this.calcularCantidadTotal(data.items);
        this.subtotal = this.calcularPrecioTotal(data.items);
        this.loading = false;
      }
    })
  }

  calcularCantidadTotal(items: DfacturaDto[]): number {
    return items.reduce((total, item) => total + item.cantidad, 0);
  }

  calcularPrecioTotal(items: DfacturaDto[]): number {
    return items.reduce((total, item) => total + item.precio, 0);
  }
}
