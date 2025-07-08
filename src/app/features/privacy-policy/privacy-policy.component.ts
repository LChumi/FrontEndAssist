import {Component, inject, OnInit} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styles: ``
})
export class PrivacyPolicyComponent implements OnInit {

  titleService = inject(Title);
  metaService = inject(Meta);

  protected emailInfo: string='info@cumpleanos.com.ec';

  ngOnInit(): void {
    this.titleService.setTitle('Politica de Privacidad');
    this.metaService.updateTag({
      name: 'description',
      content: 'Nuestra Politica de privacidad'
    });
  }
}
