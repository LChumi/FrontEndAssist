import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProgramaW} from "@models/entities/programa-w";

@Injectable({
  providedIn: 'root'
})
export class ProgramaWService {

  private baseUrl = `${environment.apiUrlBase}/assist`
  private http = inject(HttpClient)

  getAll(): Observable<ProgramaW[]> {
    return this.http.get<ProgramaW[]>(`${this.baseUrl}/programaw/all`)
  }

  getById(id: number): Observable<ProgramaW> {
    return this.http.get<ProgramaW>(`${this.baseUrl}/programaw/${id}`)
  }

  create(menu: ProgramaW): Observable<ProgramaW> {
    return this.http.post<ProgramaW>(`${this.baseUrl}/programaw`, menu)
  }

  update(menu: ProgramaW): Observable<ProgramaW> {
    return this.http.put<ProgramaW>(`${this.baseUrl}/programaw`, menu)
  }

}
