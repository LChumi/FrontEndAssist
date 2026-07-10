import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MenuW} from "@models/entities/menu-w";

@Injectable({
  providedIn: 'root'
})
export class MenuWService {

  private baseUrl = `${environment.apiUrlBase}/assist`
  private http = inject(HttpClient)

  getAll():Observable<MenuW[]>{
    return this.http.get<MenuW[]>(`${this.baseUrl}/menuw/all`)
  }

  getById(id: number):Observable<MenuW>{
    return this.http.get<MenuW>(`${this.baseUrl}/menuw/${id}`)
  }

  create(menu:MenuW): Observable<MenuW>{
    return this.http.post<MenuW>(`${this.baseUrl}/menuw`,menu)
  }

  update(menu:MenuW): Observable<MenuW>{
    return this.http.put<MenuW>(`${this.baseUrl}/menuw`,menu)
  }

}
