import {Component, inject, Input, input, OnInit} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {ButtonDirective} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";
import {getCurrentDate, getSessionItem} from "@utils/index";
import {DtipodocService} from "@services/api/dtipodoc.service";
import {Dtipodoc} from "@models/entities/dtipodoc";
import {FormsModule} from "@angular/forms";
import {AlmacenService} from "@services/api/almacen.service";
import {Almacen} from "@models/entities/almacen";
import {PuntoventaService} from "@services/api/puntoventa.service";
import {Puntoventa} from "@models/entities/puntoventa";
import {SelectionService} from "@services/state/selection.service";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-seleccion-comprobante',
  standalone: true,
  imports: [
    DialogModule,
    ButtonDirective,
    DropdownModule,
    ChipsModule,
    FormsModule,
    CalendarModule
  ],
  templateUrl: './seleccion-comprobante.component.html',
  styles: ``
})
export class SeleccionComprobanteComponent implements OnInit {
  public tipoDoc = input.required<number>();
  @Input() visible: boolean = false;

  date: string = '';
  empresa: any;
  fecha: any

  dTipoDoc: Dtipodoc[] = [];
  almacenes: Almacen[] = [];
  pventas: Puntoventa[] = [];

  dTipoDocSelected: Dtipodoc = {} as Dtipodoc;
  almacenSelected: Almacen = {} as Almacen;
  pventasSelected: Puntoventa = {} as Puntoventa;

  tipoDocService = inject(DtipodocService)
  almacenService = inject(AlmacenService)
  pventaService = inject(PuntoventaService)
  seleccionService = inject(SelectionService)

  ngOnInit(): void {
    this.empresa = getSessionItem("empresa");
    this.date = getCurrentDate()
    this.getDocumento()
    this.getAlmacen()
    this.getPuntoventaDefecto()
    this.seleccionService.almacenSeleccionado$.subscribe(id => {
      this.getPuntoventa(id)
    })
  }

  getDocumento() {
    if (this.empresa) {
      this.tipoDocService.getTipoDoc(Number(this.empresa), this.tipoDoc()).subscribe({
        next: (result) => {
          this.dTipoDoc = result;
          this.dTipoDocSelected= result[0]
        }
      })
    }
  }

  getAlmacen() {
    const almacen = Number(getSessionItem("almId"))
    if (this.empresa && almacen) {
      this.seleccionService.actualizarAlmacenSeleccionado(almacen);
      this.almacenService.getAlmacen(this.empresa, almacen).subscribe({
        next: (result) => {
          this.almacenes.push(result);
          this.almacenSelected= result
        }
      })
    }
  }

  getAlmacenes() {
    if (this.empresa) {
      this.almacenService.listAlamacenes(this.empresa).subscribe({
        next: (result) => {
          this.almacenes = result;
        }
      })
    }
  }

  getPuntoventa(almId: number) {
    if (this.empresa && almId) {
      this.pventaService.listPventas(this.empresa, almId).subscribe({
        next: (result) => {
          this.pventas = result;
        }
      })
    }
  }

  onAlmacenChange(event: any) {
    const selectedAlmacen = event.value;
    this.pventasSelected = {} as Puntoventa;
    this.seleccionService.actualizarAlmacenSeleccionado(selectedAlmacen.codigo);
  }

  close() {
    this.visible = false;
    this.dTipoDoc = [];
    this.almacenes = [];
    this.date = '';
  }

  getPuntoventaDefecto() {
    const almacen = Number(getSessionItem("almId"))
    const pventa = Number(getSessionItem("pventa"))
    this.pventaService.getPventa(this.empresa, almacen, pventa).subscribe({
      next: (result) => {
        console.log(result);
        this.pventasSelected = result
      }
    })
  }

  saveDocumento() {
    console.log(this.pventasSelected)
    console.log(this.pventas)
    console.log(this.seleccionService)
    console.log(this.almacenSelected)
    console.log(this.dTipoDocSelected)
    console.log(this.fecha)
  }

}
