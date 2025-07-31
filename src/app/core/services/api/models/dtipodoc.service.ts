import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dtipodoc} from "@models/entities/dtipodoc";

@Injectable({
  providedIn: 'root'
})
export class DtipodocService {

  private baseUrl = environment.apiUrlBase + '/models';
  private http = inject(HttpClient)

  constructor() { }

  getTipoDoc(empresa: number, tpdCodigo: number): Observable<Dtipodoc[]>{
    return this.http.get<Dtipodoc[]>(`${this.baseUrl}/dtipodoc/${empresa}/${tpdCodigo}`)
  }
}
