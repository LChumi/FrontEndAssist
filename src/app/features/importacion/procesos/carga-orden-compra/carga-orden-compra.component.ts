import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";

@Component({
  standalone: true,
  imports: [],
  templateUrl: './carga-orden-compra.component.html',
  styles: ``
})
export class CargaOrdenCompraComponent implements OnInit{

  private route = inject(Router);
  private seoService=  inject(SeoService);
  private domain = environment.domain;

    ngOnInit(): void {
      const currentURL = `${this.domain}${this.route.url}`
      this.seoService.updateCanonical(currentURL);

      const title = 'Orden de compra'
      const description = 'Carga de orden de compra al sistema 1 fase'
      this.seoService.update(title, description);

    }

}
