import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {RolMenu} from "@models/entities/rol-menu";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RolMenuService {

  private baseUrl = `${environment.apiUrlBase}/assist`
  private http = inject(HttpClient)

  getAll():Observable<RolMenu[]>{
    return this.http.get<RolMenu[]>(`${this.baseUrl}/rol-menu/all`)
  }

  getById(id: number):Observable<RolMenu>{
    return this.http.get<RolMenu>(`${this.baseUrl}/rol-menu/${id}`)
  }

  create(menu:RolMenu): Observable<RolMenu>{
    return this.http.post<RolMenu>(`${this.baseUrl}/rol-menu`,menu)
  }

  update(menu:RolMenu): Observable<RolMenu>{
    return this.http.put<RolMenu>(`${this.baseUrl}/rol-menu`,menu)
  }

}
