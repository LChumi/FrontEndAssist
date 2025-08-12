import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "@models/entities/cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = environment.apiUrlBase + '/models';
  private http = inject(HttpClient)

  constructor() {
  }

  getClienteXTipo(empresa: number, tipo: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/cliente/list/${empresa}/${tipo}`)
  }

  getClienteById(empresa: number, codigo: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.baseUrl}/cliente/get/${codigo}/${empresa}`)
  }

}
