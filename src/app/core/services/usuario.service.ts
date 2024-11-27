import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServiceResponse} from "@models/record/service-response";
import {AuthenticationRequest} from "@models/auth/authentication-request";
import {UserResponse} from "@models/record/user-response";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = environment.apiUrlBase+'assist'
  http = inject(HttpClient)

  constructor() { }

  temporalLogin(request: AuthenticationRequest): Observable<UserResponse>{
    return this.http.post<UserResponse>(`${this.baseUrl}/login`,request)
  }

  recoveryPassword(userId: string): Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(`${this.baseUrl}/forgot-password/${userId}`)
  }

}
