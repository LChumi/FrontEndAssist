import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServiceResponse} from "@models/record/service-response";
import {PedidoHojaId} from "@models/dto/pedido-hoja-id";

@Injectable({
  providedIn: 'root'
})
export class PedidoHojaService {

  private baseUrl = environment.apiUrlBase + '/models';
  private http = inject(HttpClient)

  constructor() { }

  updateHojaEstado(id:PedidoHojaId, estado:number): Observable<ServiceResponse>{
    return this.http.put<ServiceResponse>(`${this.baseUrl}/pedido-hoja/${estado}`, id)
  }
}
