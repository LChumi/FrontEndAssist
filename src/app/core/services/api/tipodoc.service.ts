import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tipodoc} from "@models/entities/tipodoc";

@Injectable({
  providedIn: 'root'
})
export class TipodocService {

  private baseUrl = environment.apiUrlBase + '/models';
  private http = inject(HttpClient);

  constructor() { }

  listarTipoDocs(): Observable<Tipodoc[]> {
    return this.http.get<Tipodoc[]>(`${this.baseUrl}/listar/tipodoc`);
  }
}
