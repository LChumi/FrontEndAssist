import {Component, EventEmitter, inject, Input, input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {ButtonDirective} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";
import {getCurrentDateNow, getDateFormattedNow, getSessionItem} from "@utils/index";
import {DtipodocService} from "@services/api/models/dtipodoc.service";
import {Dtipodoc} from "@models/entities/dtipodoc";
import {FormsModule} from "@angular/forms";
import {AlmacenService} from "@services/api/models/almacen.service";
import {Almacen} from "@models/entities/almacen";
import {PuntoventaService} from "@services/api/models/puntoventa.service";
import {Puntoventa} from "@models/entities/puntoventa";
import {SelectionService} from "@services/state/selection.service";
import {CalendarModule} from "primeng/calendar";
import {SolicitudRequestDTO} from "@models/dto/solicitud-request-dto";
import {MessageService} from "primeng/api";

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
export class SeleccionComprobanteComponent implements OnInit, OnDestroy, OnChanges {

  private _visible = false;
  public tipoDoc = input.required<number>();
  public observacion = input.required<string>();

  @Input() set visible(value: boolean) {
    this._visible = value;
    if (value) {
      this.initializeModal();
    }
  }

  get visible(): boolean {
    return this._visible;
  }

  @Output() saveRequest = new EventEmitter<{ request: SolicitudRequestDTO, visible: boolean }>();
  @Output() visibleChange = new EventEmitter<boolean>();

  empresa: any;
  fecha: any

  dTipoDoc: Dtipodoc[] = [];
  almacenes: Almacen[] = [];
  pventas: Puntoventa[] = [];

  dTipoDocSelected: Dtipodoc = {} as Dtipodoc;
  almacenSelected: Almacen = {} as Almacen;
  pventasSelected: Puntoventa = {} as Puntoventa;

  private tipoDocService = inject(DtipodocService)
  private almacenService = inject(AlmacenService)
  private pventaService = inject(PuntoventaService)
  private seleccionService = inject(SelectionService)
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.initializeModal()
  }

  ngOnChanges(): void {
    this.initializeModal()
  }

  initializeModal(): void {
    this.empresa = getSessionItem("empresa");
    this.fecha = getDateFormattedNow()
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
          this.dTipoDocSelected = result[0]
        }
      })
    }
  }

  getAlmacen() {
    this.almacenes = []
    const almacen = Number(getSessionItem("almId"))
    if (this.empresa && almacen) {
      this.seleccionService.actualizarAlmacenSeleccionado(almacen);
      this.almacenService.getAlmacen(this.empresa, almacen).subscribe({
        next: (result) => {
          this.almacenes.push(result);
          this.almacenSelected = result
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

  cleanupModal() {
    this.dTipoDoc = [];
    this.almacenes = [];
    this.fecha = getDateFormattedNow();
  }

  close() {
    this.visible = false;
    this.cleanupModal()
    this.visibleChange.emit(false);
  }

  getPuntoventaDefecto() {
    const almacen = Number(getSessionItem("almId"))
    const pventa = Number(getSessionItem("pventa"))
    this.pventaService.getPventa(this.empresa, almacen, pventa).subscribe({
      next: (result) => {
        this.pventasSelected = result
      }
    })
  }

  saveDocumento() {
    if (!this.fecha){
      this.messageService.add({severity: 'warn', summary: 'Campos vacios', detail: 'Llene los campos del formulario', life: 3000});
      return
    }
    const usuario = Number(getSessionItem("usrId"));
    let proveedor
    let bodega
    this.seleccionService.clienteSeleccionado$.subscribe(id => {
      proveedor = id
    })
    this.seleccionService.bodegaSeleccionada$.subscribe(id => {
      bodega = id
    })
    if (proveedor && usuario && bodega && this.observacion()) {
      const request: SolicitudRequestDTO = {
        empresa: this.empresa,
        tipodoc: this.dTipoDocSelected.tpdCodigo,
        almacen: this.almacenSelected.codigo,
        pventa: this.pventasSelected.secuencia,
        sigla: this.dTipoDocSelected.ctiCodigo,
        proveedor: proveedor,
        usuario: usuario,
        fecha: this.fecha,
        modulo: this.dTipoDocSelected.modCodigo,
        bodega: bodega,
        observacion: this.observacion(),
        items: []
      }
      this.visible = false;
      this.saveRequest.emit({request: request, visible: false})
    }
  }

  ngOnDestroy(): void {
    this.cleanupModal()
  }

}
