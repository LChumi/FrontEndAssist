import {Component, inject, OnInit} from '@angular/core';
import {ComImpService} from "@services/api/assist/com-imp.service";
import {SeoHelperService} from "@services/state/seo-helper.service";
import {ClarityService} from "@services/state/clarity.service";
import {ComImpV1} from "@models/view/com-imp-v1";
import {FavoriteComponent} from "@shared/component/favorite/favorite.component";
import {getSessionItem} from "@utils/storage-utils";
import {Table, TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {DatePipe} from "@angular/common";

@Component({
  standalone: true,
  imports: [
    FavoriteComponent,
    TableModule,
    InputTextModule,
    ButtonDirective,
    DatePipe
  ],
  templateUrl: './carga-importacion.component.html',
  styles: ``
})
export default class CargaImportacionComponent implements OnInit {

  private comimpService = inject(ComImpService)
  private seoHelper = inject(SeoHelperService);
  private clarity= inject(ClarityService)

  listImportaciones: ComImpV1[] =[]
  docSelected: ComImpV1 | null = null;
  imporSelected = false;

  ngOnInit() {
    const emp =getSessionItem('empresa')
    if (emp){
      this.getImportaciones(Number(emp))
    }
  }

  getImportaciones(empresa: number){
    this.comimpService.getImportacionPen(empresa).subscribe({
      next: data => {
        console.log(data)
        this.listImportaciones = data
      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  selectedImp(doc: ComImpV1){
    this.docSelected = doc
    this.imporSelected = true;
  }
}
