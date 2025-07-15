import {inject, Injectable} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class SeoService {

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
}
