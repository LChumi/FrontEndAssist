import {Component, inject, OnInit} from '@angular/core';
import {getSessionItem} from "@utils/storage-utils";
import {SolicitudCompraImportacionService} from "@services/api/solicitud-compra-importacion.service";
import {SolicitudCompraImportacionDto} from "@models/dto/solicitud-compra-importacion-dto";
import {ActivatedRoute} from "@angular/router";
import {DfacturaDto} from "@models/dto/dfactura-dto";

@Component({
  standalone: true,
  imports: [],
  templateUrl: './visualizacion-carga.component.html',
  styles: ``
})
export default class VisualizacionCargaComponent implements OnInit {

  private sCiService = inject(SolicitudCompraImportacionService);
  private route = inject(ActivatedRoute);

  protected sci : SolicitudCompraImportacionDto = {} as SolicitudCompraImportacionDto;

  protected empresa: any
  protected documento: any;
  protected cantidadTotal: any;

  ngOnInit(): void {
    const nombre =getSessionItem('nombreEmpresa')
    const doc = getSessionItem('SCI')
    if (nombre && doc) {
      this.empresa = nombre;
      this.documento = doc;
    }
    this.route.queryParams.subscribe((params) => {
      const cco = params['cco'];
      const doc = params['documento'];
      if (cco && doc) {
        this.getSci(cco)
        this.documento = doc;
      }
    })
  }

  getSci(cco: any){
    this.sCiService.verSci(cco).subscribe({
      next: data => {
        this.sci = data;
        this.cantidadTotal = this.calcularCantidadTotal(data.items);
      }
    })
  }

  calcularCantidadTotal(items: DfacturaDto[]): number {
    return items.reduce((total, item) => total + item.cantidad, 0);
  }
}
