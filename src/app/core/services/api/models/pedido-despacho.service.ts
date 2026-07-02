import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FacDespedidowebV} from "@models/view/fac-despedidoweb-v";
import {FacDesprodWebV} from "@models/view/fac-desprod-web-v";
import {ServiceResponse} from "@models/record/service-response";

@Injectable({
  providedIn: 'root'
})
export class PedidoDespachoService {

  private baseUrl = environment.apiUrlBase + '/assist';
  private http = inject(HttpClient);

  constructor() { }

  getPendientes(usuario:string, estado:number):Observable<FacDespedidowebV[]> {
    return this.http.get<FacDespedidowebV[]>(`${this.baseUrl}/despachos/pendientes/${usuario}/${estado}`)
  }

  getProductos(empresa:number, cco: any):Observable<FacDesprodWebV[]>{
    return this.http.get<FacDesprodWebV[]>(`${this.baseUrl}/despachos/productos/${empresa}/${cco}`)
  }

  addCantidad(producto:FacDesprodWebV):Observable<ServiceResponse>{
    return this.http.post<ServiceResponse>(`${this.baseUrl}/despachos/add-cantidad`, producto)
  }
}
