import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Observable} from "rxjs";
import {MenuPrincipal} from "@models/dto/menu-principal";
import {Empresa} from "@models/entities/empresa";

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private baseUrl = environment.apiUrlBase + '/assist'
  private http = inject(HttpClient)

  constructor() {
  }

  getMenus(usuario: number, empresa: number): Observable<MenuPrincipal[]> {
    return this.http.get<MenuPrincipal[]>(`${this.baseUrl}/menus/${usuario}/${empresa}`)
  }

  getEmpresas(usuario: number): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.baseUrl}/empresas/${usuario}`)
  }

}
