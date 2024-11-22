import {Component, inject} from '@angular/core';
import {LayoutService} from "@layout/service/layout.service";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
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
    PasswordModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export default class LoginComponent {
  rememberMe: boolean = false;
  password!: string;

  layoutService = inject(LayoutService)

  get dark() {
    return this.layoutService.config().colorScheme !== 'light';
  }
}
