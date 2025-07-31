import {Component, inject, OnInit} from '@angular/core';
import {AutoCompleteModule} from "primeng/autocomplete";
import {ButtonDirective} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DetalleProductoCcoComponent} from "@shared/component/detalle-producto-cco/detalle-producto-cco.component";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {EstadoPipe} from "@shared/pipes/estado.pipe";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {SidebarModule} from "primeng/sidebar";
import {TableModule} from "primeng/table";
import {CtipocomService} from "@services/api/models/ctipocom.service";
import {AlmacenService} from "@services/api/models/almacen.service";
import {TipodocService} from "@services/api/models/tipodoc.service";
import {ListCcomprobaVService} from "@services/api/assist/list-ccomproba-v.service";
import {Almacen} from "@models/entities/almacen";
import {Ctipocom} from "@models/dto/ctipocom";
import {Tipodoc} from "@models/entities/tipodoc";
import {ListCcomprobaV} from "@models/view/list-ccomproba-v";
import {getSessionItem} from "@utils/storage-utils";
import {getCurrentDate, getMonthFormattedDate, getYearFormattedDate} from "@utils/date-utils";
import {Router} from "@angular/router";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";

@Component({
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonDirective,
    CalendarModule,
    DetalleProductoCcoComponent,
    DialogModule,
    DropdownModule,
    EstadoPipe,
    FormsModule,
    InputTextModule,
    PrimeTemplate,
    Ripple,
    SidebarModule,
    TableModule
  ],
  templateUrl: './monitoreo.component.html',
  styles: ``
})
export default class MonitoreoComponent implements OnInit {

  private ctipocomService = inject(CtipocomService);
  private almacenService = inject(AlmacenService);
  private tipodocService = inject(TipodocService);
  private listCcomprobaService = inject(ListCcomprobaVService)
  private router = inject(Router)
  private domain = environment.domain;
  private seoService = inject(SeoService);

  private empresa: any;
  protected periodo: any;
  protected fecha: any;
  protected mes: any;
  protected sigla: any;
  protected almacen: any;
  protected serie: any;
  protected numero!: number;
  protected concepto!: string;
  protected referencia!: string;
  protected estado!: any;
  protected tipodoc!: any;
  protected estados: any;
  usrId: any
  cco: any

  loading = false;
  visibleSidebarFilters = false;
  displayDialog = false;

  protected almacenes: Almacen[] = [];
  protected siglas: Ctipocom[] = [];
  protected tipoDocs: Tipodoc[] = [];
  protected listaComprobantes: ListCcomprobaV[] = []

  protected almacenSelected: Almacen = {} as Almacen;

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`
    this.seoService.updateCanonical(currentUrl);

    const title='Monitoreo'
    const description='Monitoreo de Documento'
    this.seoService.update(title, description);

    this.usrId = getSessionItem('usrId')
    this.empresa = getSessionItem("empresa");
    this.getAlmacenes()
    this.getSiglas()
    this.getDocs()
    this.estados = [
      {name: 'En Proceso', code: 0},
      {name: 'Grabado', code: 1},
      {name: 'Mayorizado', code: 2},
      {name: 'Aut. Final', code: 3},
      {name: 'Anulados', code: 9},
    ]
  }

  onAlmacenChange(event: any) {
    this.almacenSelected = event.value;
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

  getSiglas() {
    if (this.empresa) {
      this.ctipocomService.listar(this.empresa).subscribe({
        next: (result) => {
          this.siglas = result;
        }
      })
    }
  }

  getDocs() {
    this.tipodocService.listarTipoDocs().subscribe({
      next: (result) => {
        this.tipoDocs = result;
      }
    })
  }

  find() {
    this.visibleSidebarFilters = false
    this.loading = true;
    const formattedMonth = getMonthFormattedDate(this.mes);
    const formattedYear = getYearFormattedDate(this.periodo);
    const formattedDate = getCurrentDate(this.fecha)

    const sigla = this.sigla ? this.sigla.codigo : null;
    const almacen: any = this.almacenSelected ? this.almacenSelected.codigo : null;
    const estado = this.estado ? this.estado.code : null;
    const tipodoc = this.tipodoc ? this.tipodoc.id : null;

    let count = 0;
    if (sigla) count++;
    if (almacen) count++;
    if (estado) count++;
    if (tipodoc) count++;
    if (formattedYear) count++;
    if (formattedMonth) count++;
    if (this.serie) count++;
    if (this.numero) count++;
    if (formattedDate) count++;

    // Verificar que al menos dos parámetros estén presentes
    if (count < 2) {
      alert('Por favor, completa al menos dos campos');
      this.loading = false;
      return;
    }

    this.listCcomprobaService.buscar(
      this.empresa,
      formattedYear,
      formattedDate,
      formattedMonth,
      sigla,
      almacen,
      this.serie,
      this.numero,
      this.concepto,
      this.referencia,
      estado,
      tipodoc
    ).subscribe({
      next: (result) => {
        this.listaComprobantes = result;
        this.loading = false;
      }, error: err => {
        this.loading = false;
        this.listaComprobantes = []
      }
    });
  }

  verDocumento(cco: any) {
    if (cco.length > 0) {
      this.cco = cco;
      this.displayDialog = true;
    }
  }
}
