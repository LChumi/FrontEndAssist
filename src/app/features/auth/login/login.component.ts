import {Component, inject, OnInit} from '@angular/core';
import {CheckboxModule} from "primeng/checkbox";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {ConfigComponent} from "@layout/config/config.component";
import {PasswordModule} from "primeng/password";
import {UsuarioService} from "@services/api/usuario.service";
import {AuthenticationRequest} from "@models/auth/authentication-request";
import {MessageService} from "primeng/api";
import {ErrorResponse} from "@models/error/error-response";
import {getSessionItem, setSessionItem} from "@utils/index";
import {CanonicalService} from "@services/state/canonical.service";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";

@Component({
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    RouterLink,
    ButtonDirective,
    Ripple,
    InputTextModule,
    ConfigComponent,
    PasswordModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export default class LoginComponent implements OnInit {
  password!: string;

  loginForm!: FormGroup

  private fb = inject(FormBuilder)
  private usuarioService = inject(UsuarioService)
  private router = inject(Router)
  private messageService = inject(MessageService)
  private canonicalService = inject(CanonicalService)
  private domain = environment.apiUrlBase;
  private seoService = inject(SeoService)

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`
    this.canonicalService.updateCanonical(currentUrl);

    const title='Login'
    const description='Inicio de sesion'
    this.seoService.update(title, description);

    this.getSession()
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }
    const usuario = this.loginForm.get('usuario')?.value
    const password = this.loginForm.get('password')?.value

    const loginRequest: AuthenticationRequest = {
      nombreUsuario: usuario,
      clave: password
    }

    this.usuarioService.temporalLogin(loginRequest).subscribe({
      next: user => {
        setSessionItem('usrId',String(user.id))
        setSessionItem('nombre', user.nombre)
        setSessionItem('username', user.username)
        this.messageService.add({severity: 'success', summary: 'Bienvenido', detail: user.nombre, life: 2000})
        this.goToEmpresas()
      }, error: (error: ErrorResponse) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Verifique nombre usuario o contraseña',
          detail: error.message
        })
      }
    })
  }

  goToEmpresas() {
    this.router.navigate(['/assist', 'auth', 'empresas']).then(r => {})
  }

  private getSession(){
    setTimeout(() => {
      const usrId = getSessionItem("usrId")
      if (usrId){
        this.messageService.add({severity: 'success', summary: 'Bienvenido', detail: 'Sesión iniciada', life: 2000})
        this.goToEmpresas()
      }
    },500)
  }

}
