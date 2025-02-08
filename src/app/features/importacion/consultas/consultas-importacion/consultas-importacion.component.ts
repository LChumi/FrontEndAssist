import {Component, inject, OnInit} from '@angular/core';
import {ImpProdTrancitoService} from "@services/api/imp-prod-trancito.service";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {getCurrentDate} from "@utils/date-utils";
import {getSessionItem} from "@utils/storage-utils";
import {ImpProdTrancitoVw} from "@models/view/imp-prod-trancito-vw";
import {TableModule} from "primeng/table";

@Component({
  standalone: true,
  imports: [
    ChipsModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    TableModule
  ],
  templateUrl: './consultas-importacion.component.html',
  styles: ``
})
export default class ConsultasImportacionComponent implements OnInit {

  private impProdTrancitoService = inject(ImpProdTrancitoService);

  protected impProdTrancitos: ImpProdTrancitoVw[] = []

  private empresa: any;
  protected nroComprobante!: string;
  protected observacion!: string;
  protected fecha: any;
  protected estado: any
  protected estados: any
  protected loading : boolean = false;
  protected prov : any

  ngOnInit(): void {
    this.empresa = getSessionItem("empresa");
    this.estados =[
      {name: 'LIQUIDADO'},
      {name: 'EN PROCESO'},
      {name: 'PRELIQUIDADO PARCIAL'},
      {name: 'ELIMINADO'},
      {name: 'DISTRI. GASTOS'},
      {name: 'RELIQUIDADO TOTAL'},
    ]
  }

  find(){
    this.loading = true;
    const formattedDate = getCurrentDate(this.fecha);
    const nroComprobante = this.nroComprobante ? this.nroComprobante : '';
    const observacion = this.observacion ? this.observacion : '';
    const estado = this.estado ? this.estado : null;

    let count = 0;
    if (nroComprobante) count++;
    if (observacion) count++;
    if (estado) count++;
    if (formattedDate) count++;

    if (count < 1){
      alert('No se ha seleccionado ningun campo')
      this.loading = false;
      return;
    }

    console.log(nroComprobante)
    console.log(formattedDate)
    console.log(observacion)
    console.log(estado)

    this.impProdTrancitoService.buscar(
      this.empresa,
      nroComprobante,
      observacion,
      this.prov,
      formattedDate,
      estado,
    ).subscribe({
      next: (result) => {
        this.loading = false;
        this.impProdTrancitos = result;
        console.log(result)
      }
    })
  }

}
