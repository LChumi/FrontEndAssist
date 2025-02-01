import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompraDetalleProductoDto} from "@models/dto/compra-detalle-producto-dto";

@Injectable({
  providedIn: 'root'
})
export class ComprobanteDetalleProductoService {

  private baseUrl = environment.apiUrlBase + 'models';
  private http = inject(HttpClient);

  constructor() { }

  verSci(cco: any): Observable<CompraDetalleProductoDto>{
    return this.http.get<CompraDetalleProductoDto>(`${this.baseUrl}/ver-sci/${cco}`)
  }
}
