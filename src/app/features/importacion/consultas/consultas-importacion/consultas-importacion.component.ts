import {Component, inject, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {Almacen} from "@models/entities/almacen";
import {Ctipocom} from "@models/dto/ctipocom";
import {AutoCompleteModule} from "primeng/autocomplete";
import {CtipocomService} from "@services/api/ctipocom.service";
import {AlmacenService} from "@services/api/almacen.service";
import {getSessionItem} from "@utils/storage-utils";
import {Ripple} from "primeng/ripple";
import {Tipodoc} from "@models/entities/tipodoc";
import {TipodocService} from "@services/api/tipodoc.service";
import {getCurrentDate, getMonthFormattedDate, getYearFormattedDate} from "@utils/index";
import {ListCcomprobaVService} from "@services/api/list-ccomproba-v.service";
import {ListCcomprobaV} from "@models/view/list-ccomproba-v";
import {TableModule} from "primeng/table";

@Component({
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule,
    Ripple,
    TableModule
  ],
  templateUrl: './consultas-importacion.component.html',
  styles: ``
})
export default class ConsultasImportacionComponent implements OnInit {

  private ctipocomService = inject(CtipocomService);
  private almacenService = inject(AlmacenService);
  private tipodocService = inject(TipodocService);
  private listCcomprobaService = inject(ListCcomprobaVService)

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

  mostrarFiltros = false;
  loading = false;

  protected almacenes: Almacen[] = [];
  protected siglas: Ctipocom[] = [];
  protected filteredCountries: Ctipocom[] = [];
  protected tipoDocs: Tipodoc[] = [];
  protected listaComprobantes: ListCcomprobaV[] =[]

  protected almacenSelected: Almacen = {} as Almacen;

  ngOnInit(): void {
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

  searchSigla(event: any) {
    const filtered: any[] = []
    const query = event.query;

    for (let i = 0; i < this.siglas.length; i++) {
      const sig = this.siglas[i];
      if (sig.ctiId.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(sig);
      }
    }
    this.filteredCountries = filtered;
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

  getDocs(){
    this.tipodocService.listarTipoDocs().subscribe({
      next: (result) => {
        this.tipoDocs = result;
      }
    })
  }

  find() {
    this.loading = true;
    const formattedMonth = getMonthFormattedDate(this.mes);
    const formattedYear = getYearFormattedDate(this.periodo);
    const formattedDate = getCurrentDate(this.fecha)

    const sigla = this.sigla ? this.sigla.codigo : null;
    const almacen: any = this.almacenSelected ? this.almacenSelected.codigo : null;
    const estado = this.estado ? this.estado.code : null;
    const tipodoc = this.tipodoc ? this.tipodoc.id : null;

    console.log('Sigla', sigla);
    console.log('Almacen seleccionado', almacen);
    console.log('Mes', formattedMonth);
    console.log('Año', formattedYear);
    console.log('Serie', this.serie);
    console.log('Numero', this.numero);
    console.log('Estado', estado);
    console.log('Tipodoc', tipodoc);

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
        console.log(result)
        this.loading = false;
      }, error: err => {
        this.loading = false;
        this.listaComprobantes = []
    }
    });
  }

  toggleMasFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }
}
