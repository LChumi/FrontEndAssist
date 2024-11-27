import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Observable} from "rxjs";
import {MenuPrincipal} from "@models/dto/menu-principal";

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private url= environment.apiUrlBase+'assist/'
  http = inject(HttpClient)

  constructor() {}

  getMenus(usuario:number, empresa:number): Observable<MenuPrincipal[]>{
    return this.http.get<MenuPrincipal[]>(`${this.url}menus/${usuario}/${empresa}`)
  }
}
