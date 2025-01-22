import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BodegaDto} from "@models/dto/bodega-dto";

@Injectable({
  providedIn: 'root'
})
export class UsrBodService {

  private baseUrl = environment.apiUrlBase + 'models';
  private http = inject(HttpClient);

  constructor() { }

  listBodegas(usrId: number, empresa: number): Observable<BodegaDto[]> {
    return this.http.get<BodegaDto[]>(`${this.baseUrl}/bodegas/usuario/${usrId}/${empresa}`, {})
  }
}
