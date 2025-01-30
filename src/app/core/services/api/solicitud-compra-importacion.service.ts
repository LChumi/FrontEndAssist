import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SolicitudCompraImportacionDto} from "@models/dto/solicitud-compra-importacion-dto";

@Injectable({
  providedIn: 'root'
})
export class SolicitudCompraImportacionService {

  private baseUrl = environment.apiUrlBase + 'models';
  private http = inject(HttpClient);

  constructor() { }

  verSci(cco: any): Observable<SolicitudCompraImportacionDto>{
    return this.http.get<SolicitudCompraImportacionDto>(`${this.baseUrl}/ver-sci/${cco}`)
  }
}
