import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Almacen} from "@models/entities/almacen";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private baseUrl = environment.apiUrlBase + '/models';
  private http = inject(HttpClient)

  constructor() { }

  getAlmacen(empresa:number, codigo: number): Observable<Almacen> {
    return this.http.get<Almacen>(`${this.baseUrl}/almacen/get/${empresa}/${codigo}`)
  }

  listAlamacenes(empresa:number): Observable<Almacen[]> {
    return this.http.get<Almacen[]>(`${this.baseUrl}/almacen/${empresa}`)
  }
}
