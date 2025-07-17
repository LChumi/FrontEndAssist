import {Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";

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

  private router = inject(Router)
  private seoService = inject(SeoService)
  private domain = environment.domain;

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`
    this.seoService.updateCanonical(currentUrl);
    const title='Pagina no Encontrada'
    this.seoService.update(title, title);
  }

}
