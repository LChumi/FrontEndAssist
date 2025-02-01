import {Component} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {Almacen} from "@models/entities/almacen";

@Component({
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    CalendarModule,
    DropdownModule
  ],
  templateUrl: './consultas-importacion.component.html',
  styles: ``
})
export default class ConsultasImportacionComponent {

  periodo:  any;
  fecha:    any;
  mes:      any;
  sigla:    any;
  almacen:  any;
  serie:    any;
  numero!:  number;

  almacenes: Almacen[] = [];

  almacenSelected: Almacen = {} as Almacen;

  onAlmacenChange(event: any) {
    this.almacenSelected = event.value;
  }

}
