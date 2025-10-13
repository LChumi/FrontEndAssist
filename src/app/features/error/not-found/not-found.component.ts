import {Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {SeoHelperService} from "@services/state/seo-helper.service";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styles: ``
})
export class NotFoundComponent implements OnInit {

  private seoHelper= inject(SeoHelperService);

  ngOnInit(): void {
    this.seoHelper.setupPageSeo({
      title: 'Pagina no Encontrada | Assist Web',
      description: 'Pagina no Encontrada o no valida sistema Assist web no se encontro lo solicitado',
      schemaTitle: 'ContentPage'
    });
  }
}
