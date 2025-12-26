import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {environment} from "@environments/environment";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private domain = environment.domain;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private renderer: Renderer2;

  /**
   * Inyecta el schema en el <head> del documento
   */
  injectSchema(schema: object, type: string): void {
    // Elimina cualquier script previo con el mismo tipo
    this.document.head.querySelectorAll(`script[data-schema-type="${type}"]`)
      .forEach(script => this.renderer.removeChild(this.document.head, script));

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema, null, 2);
    script.setAttribute('data-schema-type', type);
    this.renderer.appendChild(this.document.head, script);
  }

  /**
   * Schema para la página principal (index)
   */
  generateIndexSchema(): object {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": `${this.domain}/#breadcrumblist`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "@id": `${this.domain}/#listItem`,
              "position": 1,
              "name": "Inicio"
            }
          ]
        },
        this.generateOrganizationSchema(),
        {
          "@type": "WebPage",
          "@id": `${this.domain}/#webpage`,
          "url": this.domain,
          "name": "",
          "description": "Assist web Gestion de procesos Importadora Cumpleaños",
          "inLanguage": "es-EC",
          "isPartOf": { "@id": `${this.domain}/#website` },
          "breadcrumb": { "@id": `${this.domain}/#breadcrumblist` },
          "datePublished": "2021-08-26T12:13:00-05:00",
          "dateModified": new Date().toISOString()
        },
        this.generateWebsiteSchema()
      ]
    };
  }

  /**
   * Schema para páginas de contenido genéricas
   */
  generateContentPageSchema(currentUrl: string, pageName: string, description: string): object {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": `${currentUrl}#breadcrumblist`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "@id": `${this.domain}/#listItem`,
              "position": 1,
              "name": "Inicio",
              "item": this.domain
            },
            {
              "@type": "ListItem",
              "@id": `${currentUrl}#listItem`,
              "position": 2,
              "name": pageName,
              "item": currentUrl
            }
          ]
        },
        this.generateOrganizationSchema(),
        {
          "@type": "WebPage",
          "@id": `${currentUrl}#webpage`,
          "url": currentUrl,
          "name": `${pageName} | Assist web Cumpleanos`,
          "description": description,
          "inLanguage": "es-EC",
          "isPartOf": { "@id": `${this.domain}/#website` },
          "breadcrumb": { "@id": `${currentUrl}#breadcrumblist` },
          "datePublished": new Date().toISOString(),
          "dateModified": new Date().toISOString()
        },
        this.generateWebsiteSchema()
      ]
    };
  }

  private generateOrganizationSchema(): object {
    return {
      "@type": "Organization",
      "@id": `${this.domain}/#organization`,
      "name": "Assist web Cumpleanos",
      "description": "Assist web Gestion de procesos Importadora Cumpleaños",
      "url": this.domain,
      "email": "lchumi@cumpleanos.com.ec",
      "telephone": "+593984980840",
      "logo": {
        "@type": "ImageObject",
        "url": `${this.domain}/favicon.ico`,
        "@id": `${this.domain}/#organizationLogo`,
        "width": 1200,
        "height": 900
      },
      "image": { "@id": `${this.domain}/#organizationLogo` },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Panamericana Sur km 3 1/2",
        "addressLocality": "Cuenca",
        "addressRegion": "Azuay",
        "postalCode": "010106",
        "addressCountry": "EC"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "9:00",
          "closes": "13:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/importadoracumpleanosec/",
        "https://www.instagram.com/importadoracumpleanos/"
      ]
    };
  }

  private generateWebsiteSchema(): object {
    return {
      "@type": "WebSite",
      "@id": `${this.domain}/#website`,
      "url": this.domain,
      "name": "Assist web Cumpleanos",
      "alternateName": "Assist web Cumpleanos",
      "description": "Assist web Gestion de procesos Importadora Cumpleaños",
      "inLanguage": "es-EC",
      "publisher": { "@id": `${this.domain}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${this.domain}/products?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }
}
