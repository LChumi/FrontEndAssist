import {Component} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {ButtonDirective} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";

@Component({
  selector: 'app-seleccion-comprobante',
  standalone: true,
  imports: [
    DialogModule,
    ButtonDirective,
    DropdownModule,
    ChipsModule
  ],
  templateUrl: './seleccion-comprobante.component.html',
  styles: ``
})
export class SeleccionComprobanteComponent {

  visible = true;
}
