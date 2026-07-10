import {inject, Injectable} from '@angular/core';
import {RolW} from "@models/entities/rol-w";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RolWService {

  private baseUrl = `${environment.apiUrlBase}/assist`
  private http = inject(HttpClient)

  getAll():Observable<RolW[]>{
    return this.http.get<RolW[]>(`${this.baseUrl}/rolw/all`)
  }

  getById(id: number):Observable<RolW>{
    return this.http.get<RolW>(`${this.baseUrl}/rolw/${id}`)
  }

  create(menu:RolW): Observable<RolW>{
    return this.http.post<RolW>(`${this.baseUrl}/rolw`,menu)
  }

  update(menu:RolW): Observable<RolW>{
    return this.http.put<RolW>(`${this.baseUrl}/rolw`,menu)
  }

}
