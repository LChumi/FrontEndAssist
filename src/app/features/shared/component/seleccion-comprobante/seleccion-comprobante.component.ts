import {Component, Input, input, OnInit} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {ButtonDirective} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";
import {getCurrentDate} from "@utils/index";

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
export class SeleccionComprobanteComponent  implements OnInit {
  public tipoDoc = input.required<number>();
  @Input() visible: boolean = false;

  date:string='';

  ngOnInit(): void {
    this.date=getCurrentDate()
  }


}
