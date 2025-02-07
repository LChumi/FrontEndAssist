import {Component, inject, OnInit} from '@angular/core';
import {ImpProdTrancitoService} from "@services/api/imp-prod-trancito.service";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";

@Component({
  standalone: true,
  imports: [
    ChipsModule,
    FormsModule,
    CalendarModule,
    DropdownModule
  ],
  templateUrl: './consultas-importacion.component.html',
  styles: ``
})
export default class ConsultasImportacionComponent implements OnInit {

  private impProdTrancitoService = inject(ImpProdTrancitoService);

  protected nroComprobante!: string;
  protected observacion!: string;
  protected fecha: any;
  protected estados: any

  ngOnInit(): void {
    this.estados =[
      {name: 'LIQUIDADO'},
      {name: 'EN PROCESO'},
      {name: 'PRELIQUIDADO PARCIAL'},
      {name: 'ELIMINADO'},
      {name: 'DISTR GASTOS'},
      {name: 'RELIQUIDADO TOTAL'},
    ]
  }
}
