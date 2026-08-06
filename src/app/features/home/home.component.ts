import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {SeoHelperService} from "@services/state/seo-helper.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonDirective,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private seoHelper = inject(SeoHelperService)

  ngOnInit(): void {
    this.seoHelper.setupPageSeo({
      title: 'Pagina de Inicio | Assist Web',
      description: 'Pagina de Inicio para procesos internos del sistema Assist Web',
      schemaTitle: 'ContentPage'
    });
  }

  protected readonly email = "lchumi@cumpleanos.com.ec - luischumi.9@gmail.com"

}
