import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Items} from "@models/record/items";
import {SolicitudRequestDTO} from "@models/dto/solicitud-request-dto";
import {SciResponse} from "@models/record/sci-response";
import {OrdenComrpaListDTO} from "@models/entities/orden-comrpa-list-dto";

@Injectable({
  providedIn: 'root'
})
export class ImportacionesService {

  private baseUrl = environment.apiUrlBase + '/assist'
  private http = inject(HttpClient)

  constructor() {
  }

  sendExcel(file: File, empresa: string): Observable<Items[]> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('empresa', empresa);

    return this.http.post<Items[]>(`${this.baseUrl}/importaciones/excel/solicitud`, formData)
  }

  confirmarSolicitud(request: SolicitudRequestDTO): Observable<SciResponse> {
    return this.http.post<SciResponse>(`${this.baseUrl}/importaciones/confirmar/solicitud`, request);
  }

  sendOrder(file: File, empresa: string, cco: any): Observable<OrdenComrpaListDTO> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('empresa', empresa);
    formData.append('cco', cco)

    return this.http.post<OrdenComrpaListDTO>(`${this.baseUrl}/importaciones/excel/orden_compra`, formData)
  }

  confirmarOrden(request: SolicitudRequestDTO): Observable<SciResponse> {
    return this.http.post<SciResponse>(`${this.baseUrl}/importaciones/confirmar/orden`, request);
  }

}
