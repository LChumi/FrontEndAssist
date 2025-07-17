import {Component, inject, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink} from "@angular/router";
import {ConfigComponent} from "@layout/config/config.component";
import {ServiceResponse} from "@models/record/service-response";
import {UsuarioService} from "@services/api/usuario.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";

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
  private usuarioService = inject(UsuarioService)
  private router = inject(Router)
  private domain = environment.domain;
  private seoService = inject(SeoService)

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`
    this.seoService.updateCanonical(currentUrl);

    const title='Recuperacion de clave'
    this.seoService.update(title, title);

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
