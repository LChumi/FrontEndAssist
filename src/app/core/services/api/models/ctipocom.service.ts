import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {Observable} from "rxjs";
import {Ctipocom} from "@models/dto/ctipocom";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CtipocomService {

  private baseUrl = environment.apiUrlBase + '/models';
  private http = inject(HttpClient);

  constructor() { }

  listar(empresa: any): Observable<Ctipocom[]> {
    return this.http.get<Ctipocom[]>(`${this.baseUrl}/ctipocom/listar/${empresa}`)
  }
}
