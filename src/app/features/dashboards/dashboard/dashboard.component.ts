import {Component, inject, OnInit} from '@angular/core';
import {FavoritesService} from "@services/state/favorites.service";
import {UsuarioFavoritos} from "@models/entities/usuario-favoritos";
import {DataViewModule} from "primeng/dataview";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {getCurrentDateNow, getCurrentTime, getSessionItem, setSessionItem} from "@utils/index";
import {AccesoService} from "@services/api/acceso.service";

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
  imageUsr: any
  fecha: any;
  hora: any;
  favoritos: UsuarioFavoritos[] = [];
  layout: any = 'grid';

  private favoritoService = inject(FavoritesService)
  private accesoService = inject(AccesoService)

  constructor() {
    this.getNameLastName()
    this.getDate()
  }

  ngOnInit(): void {
    const usrId = getSessionItem("usrId");
    const empresaId = getSessionItem("empresa");
    this.getFavoritos(usrId, empresaId)
    this.getAccesos(usrId, empresaId)
  }

  getFavoritos(usuario: any, empresa: any) {
    this.favoritoService.getFavorites(usuario, empresa).subscribe({
      next: data => {
        this.favoritos = data
      }
    })
  }

  getDate() {
    this.fecha = getCurrentDateNow();
    this.hora = getCurrentTime();

  }

  getNameLastName() {
    this.nombre = getSessionItem('nombre');
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

  getAccesos(usrId:any, empresaId:any) {
    this.accesoService.getAcceso(usrId,empresaId).subscribe({
      next: data => {
        setSessionItem("almId", String(data.almacen))
        setSessionItem("pventa", String(data.pVenta))
      }
    })
  }
}
