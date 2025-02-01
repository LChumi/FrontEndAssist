import {Component, inject, OnInit} from '@angular/core';
import {getSessionItem} from "@utils/storage-utils";
import {ComprobanteDetalleProductoService} from "@services/api/comprobante-detalle-producto.service";
import {CompraDetalleProductoDto} from "@models/dto/compra-detalle-producto-dto";
import {ActivatedRoute} from "@angular/router";
import {DfacturaDto} from "@models/dto/dfactura-dto";
import {DecimalPipe} from "@angular/common";

@Component({
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './visualizacion-carga.component.html',
  styles: ``
})
export default class VisualizacionCargaComponent implements OnInit {

  private sCiService = inject(ComprobanteDetalleProductoService);
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
  }

  getSci(cco: any){
    this.sCiService.verSci(cco).subscribe({
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
