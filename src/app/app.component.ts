import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PrimeNGConfig} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  private primengConfig= inject(PrimeNGConfig)

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
