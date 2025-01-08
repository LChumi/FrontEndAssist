import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "@models/entities/cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = environment.apiUrlBase + 'assist';
  private http = inject(HttpClient)

  constructor() {
  }

  getClienteXTipo(empresa: number, tipo: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes/${empresa}/${tipo}`)
  }

  getClienteXtipoxCategoria(empresa: number, tipo: number, categoria: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/cliente/${empresa}/${tipo}/${categoria}`)
  }
}
