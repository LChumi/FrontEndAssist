import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styles: ``
})
export class NotFoundComponent {

}
