import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Empleado} from "@models/entities/empleado";
import {ServiceResponse} from "@models/record/service-response";

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {

  private baseUrl = environment.apiUrlBase
  private http = inject(HttpClient)

  constructor() {
  }

  getEmpleado(usuarioId: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.baseUrl}models/empleado/id-usuario/${usuarioId}`)
  }

  sendString(data: string, email: string): Observable<ServiceResponse> {
    const params = new HttpParams().set('email', email);
    return this.http.post<ServiceResponse>(`${this.baseUrl}recp/string`, data, {params})
  }

  sendFile(file: File, email: string): Observable<ServiceResponse> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('email', email);
    return this.http.post<ServiceResponse>(`${this.baseUrl}recp/file`, formData)
  }
}
