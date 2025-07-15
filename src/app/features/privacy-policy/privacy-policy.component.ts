import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CanonicalService} from "@services/state/canonical.service";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";

@Component({
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styles: ``
})
export class PrivacyPolicyComponent implements OnInit {

  private router = inject(Router)
  private canonicalService = inject(CanonicalService)
  private seoService = inject(SeoService);
  private domain = environment.domain;

  protected emailInfo: string='info@cumpleanos.com.ec';

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`
    this.canonicalService.updateCanonical(currentUrl);

    const title='Politica de Privacidad'
    const description='Nuestra Politica de privacidad'
    this.seoService.update(title, description);
  }
}
