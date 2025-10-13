import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";
import {SchemaService} from "@services/state/schema.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SeoHelperService {

  private domain = environment.domain;

  constructor(
    private seoService: SeoService,
    private schemaService: SchemaService,
    private router: Router
  ) {
  }

  setupPageSeo(options: {
    title: string;
    description: string;
    schemaTitle?: string;
    schemaType?: string;
  }) {
    const currentUrl = `${this.domain}${this.router.url}`;
    const schemaTitle = options.schemaTitle ?? options.title;
    const schemaType = options.schemaType ?? 'ContentPage';

    this.seoService.updateMetaTags({
      title: options.title,
      description: options.description,
      canonicalUrl: currentUrl,
      og: {
        title: options.title,
        description: options.description,
        url: currentUrl,
        image: `${this.domain}/favicon.ico`
      }
    });

    const schema = this.schemaService.generateContentPageSchema(
      currentUrl,
      schemaTitle,
      options.description
    );

    this.schemaService.injectSchema(schema, schemaType);
  }
}
