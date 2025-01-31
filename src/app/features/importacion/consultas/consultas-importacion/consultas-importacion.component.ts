import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule
  ],
  templateUrl: './consultas-importacion.component.html',
  styles: ``
})
export class ConsultasImportacionComponent {

  periodo:  any;
  fecha:    any;
  mes:      any;
  sigla:    any;
  almacen:  any;
  serie:    any;
  numero!:  number;

}
