import {Component, inject, OnInit} from '@angular/core';
import {LayoutService} from "@layout/service/layout.service";
import {CheckboxModule} from "primeng/checkbox";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {ConfigComponent} from "@layout/config/config.component";
import {PasswordModule} from "primeng/password";

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
export default class LoginComponent implements OnInit{
  rememberMe: boolean = false;
  password!: string;

  loginForm!: FormGroup

  layoutService = inject(LayoutService)
  fb = inject(FormBuilder)

  get dark() {
    return this.layoutService.config().colorScheme !== 'light';
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    if (this.loginForm.invalid){
      return
    }
  }

}
