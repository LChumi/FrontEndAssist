import {inject, Injectable} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  updateMetaTags(config: {
    title: string;
    description: string;
    canonicalUrl: string;
    og?: { title: string; description: string; url: string; image: string };
  }): void {
    // Título - funciona en SSR
    this.title.setTitle(config.title);

    // Meta tags - updateTag reemplaza los existentes del index.html
    this.meta.updateTag({name: 'description', content: config.description});

    // Open Graph - reemplazar placeholders
    if (config.og) {
      this.meta.updateTag({property: 'og:title', content: config.og.title});
      this.meta.updateTag({property: 'og:description', content: config.og.description});
      this.meta.updateTag({property: 'og:url', content: config.og.url});
      this.meta.updateTag({property: 'og:image', content: config.og.image});
    }

    // Canonical - solo actualizar en browser (en SSR queda el del index.html) actualizado
    const canonical = this.document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', config.canonicalUrl);
    }
  }
}
