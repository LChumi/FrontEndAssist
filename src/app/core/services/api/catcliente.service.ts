import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Catcliente} from "@models/entities/catcliente";

@Injectable({
  providedIn: 'root'
})
export class CatclienteService {

  private baseUrl = environment.apiUrlBase+'models';
  private http = inject(HttpClient)

  constructor() { }

  getCategoriaByEmpresa(empresa:number):Observable<Catcliente[]>{
    return this.http.get<Catcliente[]>(`${this.baseUrl}/categorias/${empresa}`)
  }
}
