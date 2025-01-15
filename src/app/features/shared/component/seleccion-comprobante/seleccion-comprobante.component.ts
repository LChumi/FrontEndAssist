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

@Component({
  selector: 'app-seleccion-comprobante',
  standalone: true,
  imports: [
    DialogModule,
    ButtonDirective,
    DropdownModule,
    ChipsModule,
    FormsModule
  ],
  templateUrl: './seleccion-comprobante.component.html',
  styles: ``
})
export class SeleccionComprobanteComponent  implements OnInit{
  public tipoDoc = input.required<number>();
  @Input() visible: boolean = false;

  date:string='';
  empresa:any;

  dTipoDoc: Dtipodoc[]=[];
  almacenes:Almacen[] =[];
  pventas:Puntoventa[] =[];

  dTipoDocSelected: Dtipodoc = {} as Dtipodoc;
  almacenSelected:  Almacen = {} as Almacen;
  pventasSelected: Puntoventa = {} as Puntoventa;

  tipoDocService = inject(DtipodocService)
  almacenService = inject(AlmacenService)
  pventaService = inject(PuntoventaService)
  seleccionService = inject(SelectionService)

  ngOnInit(): void {
    this.empresa = getSessionItem("empresa");
    this.date=getCurrentDate()
    this.getDocumento()
    this.getAlmacenes()
    this.seleccionService.almacenSeleccionado$.subscribe(id => {this.getPuntoventa(id)})
  }

  getDocumento(){
    if (this.empresa){
      this.tipoDocService.getTipoDoc(Number(this.empresa),this.tipoDoc()).subscribe({
        next: (result) => {
          this.dTipoDoc = result;
        }
      })
    }
  }

  getAlmacen(){
    const almacen = Number(getSessionItem("almId"))
    if (this.empresa && almacen){
      this.almacenService.getAlmacen(this.empresa,almacen).subscribe({
        next: (result) => {
          this.almacenes.push(result);
        }
      })
    }
  }

  getAlmacenes(){
    if (this.empresa){
      this.almacenService.listAlamacenes(this.empresa).subscribe({
        next: (result) => {
          this.almacenes = result;
        }
      })
    }
  }

  getPuntoventa(almId: number){
    if (this.empresa && almId){
      this.pventaService.listPventas(this.empresa, almId).subscribe({
        next: (result) => {
          this.pventas = result;
        }
      })
    }
  }

  onAlmacenChange(event: any){
    const selectedAlmacen = event.value;
    this.seleccionService.actualizarAlmacenSeleccionado(selectedAlmacen.codigo);
  }

  close(){
    this.visible = false;
    this.dTipoDoc = [];
    this.almacenes = [];
    this.date='';
  }

}
