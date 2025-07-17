import {inject, Injectable} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private document = inject(DOCUMENT);
  private titleService = inject(Title);
  private meta = inject(Meta);

  constructor() { }

  update(titleText: string, description: string) {
    this.titleService.setTitle(titleText);

    this.meta.updateTag({
      name: 'description',
      content: description
    })
  }

  updateCanonical(url: string){
    const link = this.document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', url);
    } else {
      const newLink = this.document.createElement('link');
      newLink.setAttribute('rel', 'canonical');
      newLink.setAttribute('href', url);
      this.document.head.appendChild(newLink);
    }
  }
}
