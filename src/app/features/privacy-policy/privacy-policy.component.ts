import {Component, inject, OnInit} from '@angular/core';
import {SeoHelperService} from "@services/state/seo-helper.service";


@Component({
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styles: ``
})
export class PrivacyPolicyComponent implements OnInit {

  protected emailInfo: string='info@cumpleanos.com.ec';
  private seoHelper = inject(SeoHelperService)

  ngOnInit(): void {
    this.seoHelper.setupPageSeo({
      title: 'Politica de Privacidad | Assist Web',
      description: 'Consulta nuestra politica de privacidad acerca de nuestro sistema',
      schemaTitle: 'ContentPage'
    });
  }
}
