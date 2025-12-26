import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ComImpV1} from "@models/view/com-imp-v1";

@Injectable({
  providedIn: 'root'
})
export class ComImpService {

  private _url = environment.apiUrlBase + '/assist';
  private _http = inject(HttpClient);

  constructor() { }

  getImportacionPen(empresa : number): Observable<ComImpV1[]>{
    return this._http.get<ComImpV1[]>(`${this._url}/compimp/${empresa}`)
  }
}
