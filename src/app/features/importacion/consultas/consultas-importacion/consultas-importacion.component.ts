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
import {PrimeNGConfig} from "primeng/api";

@Component({
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule
  ],
  templateUrl: './consultas-importacion.component.html',
  styles: ``
})
export default class ConsultasImportacionComponent implements OnInit {

  private ctipocomService = inject(CtipocomService);
  private almacenService = inject(AlmacenService);
  private primengConfig = inject(PrimeNGConfig)

  protected periodo:  any;
  protected fecha:    any;
  protected mes:      any;
  protected sigla:    any;
  protected almacen:  any;
  protected serie:    any;
  protected numero!:  number;
  private   empresa:  any;

  protected almacenes: Almacen[] = [];
  protected siglas: Ctipocom[] = [];
  protected filteredCountries: Ctipocom[] = [];

  protected almacenSelected: Almacen = {} as Almacen;
  protected siglaSelectedSelected: Ctipocom = {} as Ctipocom;

  ngOnInit(): void {
    this.empresa = getSessionItem("empresa");
    this.getAlmacenes()
    this.getSiglas()
    this.primengConfig.setTranslation({
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: "Hoy",
      clear: "Limpiar"
    });
  }


  onAlmacenChange(event: any) {
    this.almacenSelected = event.value;
  }

  searchSigla(event: any){
    const filtered: any[] =[]
    const query = event.query;

    for (let i = 0; i < this.siglas.length; i++) {
      const sig = this.siglas[i];
      if (sig.ctiId.toLowerCase().indexOf(query.toLowerCase()) == 0){
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

  save(){
    console.log(this.sigla);
    console.log(this.almacenSelected);
  }
}
