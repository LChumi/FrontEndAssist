import {Component, inject, Input} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {ComprobanteDetalleService} from "@services/api/comprobante-detalle.service";
import {ActivatedRoute} from "@angular/router";
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
export class DetalleProductoCcoComponent {
  @Input() ccoCodigo!: string ;

  private comprobanteDetalleService = inject(ComprobanteDetalleService);
  private route = inject(ActivatedRoute);

  protected sci : CompraDetalleProductoDto = {} as CompraDetalleProductoDto;

  protected empresa: any
  protected cantidadTotal: any;
  protected subtotal: any;

  ngOnInit(): void {
    const nombre =getSessionItem('nombreEmpresa')
    if (nombre) {
      this.empresa = nombre;
    }
    this.route.queryParams.subscribe((params) => {
      const cco = params['cco'];
      if (cco) {
        this.getSci(cco)
      }
    })
    if (this.ccoCodigo){
      this.getSci(this.ccoCodigo)
    }
  }

  getSci(cco: any){
    this.comprobanteDetalleService.verSci(cco).subscribe({
      next: data => {
        this.sci = data;
        this.cantidadTotal = this.calcularCantidadTotal(data.items);
        this.subtotal = this.calcularPrecioTotal(data.items);
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
