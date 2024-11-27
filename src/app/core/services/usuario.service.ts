import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServiceResponse} from "@models/record/service-response";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = environment.apiUrlBase+'assist'
  http = inject(HttpClient)

  constructor() { }

  recoveryPassword(userId: string): Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(`${this.url}/usuario/${userId}`)
  }

}
