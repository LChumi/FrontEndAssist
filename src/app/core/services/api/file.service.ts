import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Items} from "@models/record/items";
import {SolicitudRequestDTO} from "@models/dto/solicitud-request-dto";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = environment.apiUrlBase + 'assist'
  http = inject(HttpClient)

  constructor() {
  }

  sendExcel(file: File, empresa: string): Observable<Items[]> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('empresa', empresa);

    return this.http.post<Items[]>(`${this.baseUrl}/excel/solicitud`, formData)
  }

  confirmarSolicitud(request: SolicitudRequestDTO): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/confirmar/solicitud`, request)
  }


}
