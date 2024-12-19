import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentResponse} from "@models/record/payment-response";
import {InfoResponse} from "@models/record/info-response";

@Injectable({
  providedIn: 'root'
})
export class DeunaService {

  private baseUrl = environment.apiUrlBase+'pos';
  http = inject(HttpClient)

  constructor() { }

  generarPago(usrLiq: number, empresa: number):Observable<PaymentResponse>{
    return this.http.get<PaymentResponse>(`${this.baseUrl}/generar-pago/${usrLiq}/${empresa}`)
  }

  validarPago(usrLiq: number, empresa: number):Observable<InfoResponse>{
    return this.http.get<InfoResponse>(`${this.baseUrl}/validar-pago/${usrLiq}/${empresa}`)
  }
}