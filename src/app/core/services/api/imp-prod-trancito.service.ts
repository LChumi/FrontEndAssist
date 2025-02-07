import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImpProdTrancitoVw} from "@models/view/imp-prod-trancito-vw";

@Injectable({
  providedIn: 'root'
})
export class ImpProdTrancitoService {

  private baseUrl = environment.apiUrlBase + 'assist'
  private http = inject(HttpClient)

  constructor() { }

  buscar(
    empresa?: number,
    nroComprobante?: string,
    observacion?: string,
    proveedor?: number,
    fecha?: string,
    estado?: string,
  ): Observable<ImpProdTrancitoVw[]>{
    let params = new HttpParams();
    if (empresa) params = params.set('empresa', empresa);
    if (nroComprobante) params = params.set('nroComprobante', nroComprobante);
    if (observacion) params = params.set('observacion', observacion);
    if (proveedor) params = params.set('proveedor', proveedor);
    if (fecha) params = params.set('fecha', fecha);
    if (estado) params = params.set('estado', estado);
    return this.http.get<ImpProdTrancitoVw[]>(`${this.baseUrl}/buscar/prodtransitos-v`, { params });
  }
}
