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
import {ListCcomprobaV} from "@models/view/list-ccomproba-v";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    DatePipe,
    MultiSelectModule,
    FormsModule,
    ProgressSpinnerModule
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
  private sigla = 10003348 //orden de compra codigo

  listImportaciones: ComImpV1[] = []
  listaOredenes:ListCcomprobaV[] = []
  ordenesCco:any[] = []
  docSelected: ComImpV1 | null = null;
  imporSelected = false;
  loadingOrder = false;

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
    this.findSci()
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

    this.loadingOrder = true;
    this.listCcomprobaService.buscar(this.idEmpresa, undefined, undefined,undefined,this.sigla,undefined,undefined,undefined, numero, undefined, 2).subscribe({
      next: data => {
        if (data.length <= 0){
          this.messageService.add({
            severity: 'info',
            summary: 'Orden no encontrada',
            detail: 'No se encontró una orden similar a la importacion listando todas las ordenes',
            life: 3000
          });
          this.listarOrdenes()
        } else {
          this.listaOredenes = data
          this.loadingOrder = false;
        }
      },
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

  listarOrdenes(){
    this.listCcomprobaService.buscar(this.idEmpresa, undefined, undefined,undefined,this.sigla,undefined,undefined,undefined, undefined, undefined, 2).subscribe({
      next: data => {
        this.listaOredenes = data
        this.loadingOrder = false;
      }
    })
  }

}
