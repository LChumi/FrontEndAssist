import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {ConfigComponent} from "@layout/config/config.component";

@Component({
  standalone: true,
  imports: [
    InputTextModule,
    ButtonDirective,
    Ripple,
    RouterLink,
    ConfigComponent
  ],
  templateUrl: './forgotpassword.component.html',
  styles: ``
})
export default class ForgotpasswordComponent {

}
