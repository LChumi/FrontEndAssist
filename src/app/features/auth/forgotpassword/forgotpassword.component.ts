import {Component, inject, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {ConfigComponent} from "@layout/config/config.component";
import {ServiceResponse} from "@models/record/service-response";
import {UsuarioService} from "@services/usuario.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

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
export default class ForgotpasswordComponent implements OnInit{

  resendForm!: FormGroup

  response= true;
  submitted = false;
  serviceResponse: ServiceResponse={} as ServiceResponse

  usuarioService = inject(UsuarioService)
  fb = inject(FormBuilder)

  ngOnInit(): void {
    this.resendForm = this.fb.group({
      usuario: ['', Validators.required]
    })
  }

  onSubmit(){
    this.submitted= true;
    if (this.resendForm.invalid){
      return
    }
    const usuario = this.resendForm.get('usuario')?.value;
    this.usuarioService.recoveryPassword(usuario).subscribe(
      data=>{
        this.response=false
        this.serviceResponse = data
      }
    )
  }

}
