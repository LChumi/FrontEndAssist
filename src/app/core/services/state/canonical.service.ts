import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CanonicalService {

  private document = inject(DOCUMENT);

  constructor() { }

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
