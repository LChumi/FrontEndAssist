import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ImpProdTrancitoService} from "@services/api/imp-prod-trancito.service";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {getCurrentDate} from "@utils/date-utils";
import {getSessionItem} from "@utils/storage-utils";
import {ImpProdTrancitoVw} from "@models/view/imp-prod-trancito-vw";
import {TableModule} from "primeng/table";
import {Ripple} from "primeng/ripple";
import {ModalclienteComponent} from "@shared/component/modalcliente/modalcliente.component";
import {SelectionService} from "@services/state/selection.service";
import {Router} from "@angular/router";
import {CanonicalService} from "@services/state/canonical.service";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";

@Component({
  standalone: true,
  imports: [
    ChipsModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    Ripple,
    ModalclienteComponent
  ],
  templateUrl: './consultas-importacion.component.html',
  styles: ``
})
export default class ConsultasImportacionComponent implements OnInit, AfterViewInit {
  @ViewChild(ModalclienteComponent) modalcliente!: ModalclienteComponent;

  private impProdTrancitoService = inject(ImpProdTrancitoService);
  private seleccionService = inject(SelectionService);
  private router = inject(Router)
  private canonicalService = inject(CanonicalService)
  private domain = environment.domain;
  private seoService = inject(SeoService);

  protected impProdTrancitos: ImpProdTrancitoVw[] = []

  private empresa: any;
  protected nroComprobante!: string;
  protected observacion!: string;
  protected fecha: any;
  protected estado: any
  protected estados: any
  protected loading: boolean = false;
  protected proveedor = ''
  protected modalVisible = false;
  protected proveedorId: any;

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`
    this.canonicalService.updateCanonical(currentUrl);

    const title='Consultas Importacion'
    const description='Consulta de Tramites de importacion'
    this.seoService.update(title, description);

    this.empresa = getSessionItem("empresa");
    this.estados = [
      {name: 'LIQUIDADO'},
      {name: 'EN PROCESO'},
      {name: 'PRELIQUIDADO PARCIAL'},
      {name: 'ELIMINADO'},
      {name: 'DISTRI. GASTOS'},
      {name: 'RELIQUIDADO TOTAL'},
    ]
  }

  find() {
    this.loading = true;

    const formattedDate = getCurrentDate(this.fecha);
    const nroComprobante = this.nroComprobante ? this.nroComprobante : '';
    const observacion = this.observacion ? this.observacion : '';
    const estado = this.estado?.name ?? null;
    const prov = this.proveedor ? this.proveedorId : null;

    let count = 0;
    if (nroComprobante) count++;
    if (observacion) count++;
    if (estado) count++;
    if (formattedDate) count++;
    if (prov) count++;

    if (count < 1) {
      alert('No se ha seleccionado ningun campo')
      this.loading = false;
      return;
    }

    this.impProdTrancitoService.buscar(
      this.empresa,
      nroComprobante,
      observacion,
      prov,
      formattedDate,
      estado,
    ).subscribe({
      next: (result) => {
        this.loading = false;
        this.impProdTrancitos = result;
        this.proveedorId = null;
        this.estado = null;
        this.proveedor = 'Seleccionar Proveedor'
      }
    })
  }

  getButtonLabel(): string {
    if (this.proveedor == '') {
      return 'Seleccionar Proveedor'
    } else {
      return this.proveedor
    }
  }

  ngAfterViewInit(): void {
    this.modalcliente.onBtnClick.subscribe(visible => {
      this.modalVisible = visible
    })
    this.modalcliente.onChangeProv.subscribe(prov => {
      this.proveedor = prov
      this.seleccionService.clienteSeleccionado$.subscribe(id => {
        this.proveedorId = id
      })
      this.find()
    })
  }

  abrirModal() {
    this.modalVisible = !this.modalVisible;
  }
}
