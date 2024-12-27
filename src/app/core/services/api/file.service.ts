import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Items} from "@models/record/items";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = environment.apiUrlBase+'assist'
  http = inject(HttpClient)

  constructor() { }

  sendExcel(file: File, empresa: string): Observable<Items[]> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('empresa', empresa);

    return this.http.post<Items[]>(`${this.baseUrl}/excel/solicitud`, formData)
  }

  confirmarSolicitud(items: Items[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/confirmar/solicitud`, items)
  }

}
