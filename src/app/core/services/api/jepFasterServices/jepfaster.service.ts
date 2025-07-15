import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JepResponse} from "@models/record/jep-response";
import {ServiceResponse} from "@models/record/service-response";

@Injectable({
  providedIn: 'root'
})
export class JepfasterService {

  private baseUrl = environment.apiUrlBase + '/pos';
  private http = inject(HttpClient)

  constructor() { }

  generarQr(usrLiq: number, empresa: number):Observable<JepResponse>{
    return this.http.get<JepResponse>(`${this.baseUrl}/jep-faster/qr/${usrLiq}/${empresa}`)
  }

  validarPago(usrLiq: number, empresa: number):Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(`${this.baseUrl}/jep-faster/validar-pago/${usrLiq}/${empresa}`)
  }

  verificarPago(usrLiq: number, empresa: number):Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(`${this.baseUrl}/jep-faster/verificar-pago/${usrLiq}/${empresa}`)
  }

}
