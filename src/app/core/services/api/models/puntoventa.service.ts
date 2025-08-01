import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Puntoventa} from "@models/entities/puntoventa";

@Injectable({
  providedIn: 'root'
})
export class PuntoventaService {

  private baseUrl = environment.apiUrlBase + '/models';
  private http = inject(HttpClient)

  constructor() { }

  listPventas(empresa: number, almacen:number): Observable<Puntoventa[]> {
    return this.http.get<Puntoventa[]>(`${this.baseUrl}/punto-venta/listar/${empresa}/${almacen}`)
  }

  getPventa(empresa: number, almacen: number, secuencia: number): Observable<Puntoventa> {
    return this.http.get<Puntoventa>(`${this.baseUrl}/punto-venta/get/${empresa}/${almacen}/${secuencia}`)
  }
}
