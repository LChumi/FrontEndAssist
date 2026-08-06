import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonDirective,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  protected readonly email = "lchumi@cumpleanos.com.ec - luischumi.9@gmail.com"

}
