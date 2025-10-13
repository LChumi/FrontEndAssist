import {Component, inject, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink} from "@angular/router";
import {ConfigComponent} from "@layout/config/config.component";
import {ServiceResponse} from "@models/record/service-response";
import {AuthService} from "@services/api/assist/auth.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";
import {SchemaService} from "@services/state/schema.service";
import {SeoHelperService} from "@services/state/seo-helper.service";

@Component({
  standalone: true,
  imports: [
    InputTextModule,
    ButtonDirective,
    Ripple,
    RouterLink,
    ConfigComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './forgotpassword.component.html',
  styles: ``
})
export default class ForgotpasswordComponent implements OnInit {

  resendForm!: FormGroup

  response = true;
  loading = false;
  serviceResponse: ServiceResponse = {} as ServiceResponse

  private fb = inject(FormBuilder)
  private usuarioService = inject(AuthService)
  private seoHelper = inject(SeoHelperService)

  ngOnInit(): void {
      this.seoHelper.setupPageSeo({
      title: 'Recuperacion de clave | Assist Web',
      description: 'Recuperacion de claves por usuario Assist Web',
      schemaTitle: 'ContentPage'
    });

    this.resendForm = this.fb.group({
      usuario: ['', Validators.required]
    })
  }

  onSubmit() {
    this.loading = true;
    if (this.resendForm.invalid) {
      return
    }
    const usuario = this.resendForm.get('usuario')?.value;
    this.usuarioService.recoveryPassword(usuario).subscribe(
      data => {
        this.response = false
        this.serviceResponse = data
        this.loading = false;
      }, error => {
        this.loading = false
      }
    )
  }

}
