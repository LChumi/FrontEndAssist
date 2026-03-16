import {Component, inject, OnInit} from '@angular/core';
import {ComImpService} from "@services/api/assist/com-imp.service";
import {SeoHelperService} from "@services/state/seo-helper.service";
import {ClarityService} from "@services/state/clarity.service";
import {ComImpV1} from "@models/view/com-imp-v1";
import {getSessionItem} from "@utils/storage-utils";
import {Table, TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {DatePipe} from "@angular/common";
import {ListCcomprobaVService} from "@services/api/assist/list-ccomproba-v.service";
import {MessageService} from "primeng/api";
import {extraerNumeroDetalle} from "@utils/validation-util";

@Component({
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    DatePipe
  ],
  templateUrl: './carga-importacion.component.html',
  styles: ``
})
export default class CargaImportacionComponent implements OnInit {

  private comimpService = inject(ComImpService)
  private listCcomprobaService = inject(ListCcomprobaVService)
  private seoHelper = inject(SeoHelperService);
  private clarity= inject(ClarityService)
  private messageService = inject(MessageService)

  private idEmpresa: any

  listImportaciones: ComImpV1[] =[]
  docSelected: ComImpV1 | null = null;
  imporSelected = false;

  ngOnInit() {
    const emp =getSessionItem('empresa')
    if (emp){
      this.getImportaciones(Number(emp))
      this.idEmpresa = emp
    }
  }

  getImportaciones(empresa: number){
    this.comimpService.getImportacionPen(empresa).subscribe({
      next: data => {
        console.log(data)
        this.listImportaciones = data
      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  selectedImp(doc: ComImpV1){
    this.docSelected = doc
    this.imporSelected = true;
  }

  findSci() {

    if (!this.imporSelected){
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe seleccionar una importacion',
        life: 3000
      })
      return;
    }

    const sigla = 10003348 //orden de compra codigo
    const ordenDetalle = this.docSelected?.impObservaciones;

    if (!ordenDetalle){
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Importación seleccionada no tiene detalle de pedido',
        life: 3000
      });
      return;
    }

    const numero = extraerNumeroDetalle(ordenDetalle);

    if (!numero){
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No se encontró número válido en la observación',
        life: 3000
      });
      return;
    }

    this.listCcomprobaService.buscar(this.idEmpresa, sigla, numero).subscribe({
      next: data => { /* manejar datos */ },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo buscar el comprobante',
          life: 3000
        });
      }
    });
  }
}
