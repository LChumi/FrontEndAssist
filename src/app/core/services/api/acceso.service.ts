import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Acceso} from "@models/entities/acceso";

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private baseUrl = environment.apiUrlBase + 'models';
  private http = inject(HttpClient)

  constructor() { }

  getAcceso(usuario: number, empresa: number): Observable<Acceso>{
    return this.http.get<Acceso>(`${this.baseUrl}/acceso/${usuario}/${empresa}`)
  }
}
