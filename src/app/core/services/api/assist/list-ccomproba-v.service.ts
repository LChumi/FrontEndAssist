import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListCcomprobaV} from "@models/view/list-ccomproba-v";

@Injectable({
  providedIn: 'root'
})
export class ListCcomprobaVService {

  private baseUrl = environment.apiUrlBase + '/assist'
  private http = inject(HttpClient)

  constructor() { }

  buscar(
    empresa?: number,
    periodo?: number,
    fecha?: string,
    mes?: number,
    sigla?: number,
    almacen?: number,
    serie?: number,
    numero?: number,
    concepto?: string,
    referencia?: string,
    estado?: number,
    tipodoc?: number,
  ): Observable<ListCcomprobaV[]> {
    let params = new HttpParams();
    if (empresa) params = params.set('empresa', empresa);
    if (periodo) params = params.set('periodo', periodo);
    if (fecha) params = params.set('fecha', fecha); // Formato YYYY-MM-DD
    if (mes) params = params.set('mes', mes);
    if (sigla) params = params.set('sigla', sigla);
    if (almacen) params = params.set('almacen', almacen);
    if (serie) params = params.set('serie', serie);
    if (numero) params = params.set('numero', numero);
    if (concepto) params = params.set('concepto', concepto);
    if (referencia) params = params.set('referencia', referencia); // Asegúrate de que el nombre del parámetro sea correcto
    if (estado) params = params.set('estado', estado); // Asegúrate de que el nombre del parámetro sea correcto
    if (tipodoc) params = params.set('tipodoc', tipodoc); // Asegúrate de que el nombre del parámetro sea correcto
    return this.http.get<ListCcomprobaV[]>(`${this.baseUrl}/list-ccomprobav/buscar`, { params });
  }
}
