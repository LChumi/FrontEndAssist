import {Component, inject, OnInit} from '@angular/core';
import {FavoritesService} from "@services/state/favorites.service";
import {UsuarioFavoritos} from "@models/entities/usuario-favoritos";
import {DataViewModule} from "primeng/dataview";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {getCurrentDate, getCurrentTime} from "../../../core/utils";

@Component({
  standalone: true,
  imports: [
    DataViewModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent implements OnInit {
  nombre: any;
  username: any;
  imageUsr: any
  fecha: any;
  hora: any;
  favoritos: UsuarioFavoritos[] = [];

  favoritoService = inject(FavoritesService)

  constructor() {
    this.getNameLastName()
    this.getDate()
  }

  ngOnInit(): void {
    const usrId = sessionStorage.getItem("usrid");
    const empresaId = sessionStorage.getItem("empresa");
    console.log(usrId, empresaId);
    this.getFavoritos(usrId, empresaId)
  }

  getFavoritos(usuario: any, empresa: any) {
    this.favoritoService.getFavorites(usuario, empresa).subscribe({
      next: data => {
        this.favoritos = data
        console.log(data)
      }
    })
  }

  getDate() {
    this.fecha = getCurrentDate();
    this.hora = getCurrentTime();

  }

  getNameLastName() {
    this.nombre = sessionStorage.getItem('nombre');
    const nombres = this.nombre.split(' ');
    let name = nombres[0];
    let lastName = '';

    if (nombres.length > 2) {
      lastName = nombres[2];
    } else if (nombres.length > 1) {
      lastName = nombres[1];
    }

    this.nombre = (lastName ? lastName + ' ' : '') + name;
    return this.nombre;
  }
}
