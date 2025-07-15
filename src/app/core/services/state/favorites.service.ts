import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {FavoriteRequest} from "@models/record/favorite-request";
import {Observable} from "rxjs";
import {UsuarioFavoritos} from "@models/entities/usuario-favoritos";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private baseUrl = environment.apiUrlBase + '/assist'

  private http = inject(HttpClient)

  constructor() {
  }

  getFavorites(usrId: number, empresa: number): Observable<UsuarioFavoritos[]> {
    return this.http.get<UsuarioFavoritos[]>(`${this.baseUrl}/favoritos/${usrId}/${empresa}`)
  }

  addFavorite(request: FavoriteRequest): Observable<UsuarioFavoritos> {
    return this.http.post<UsuarioFavoritos>(`${this.baseUrl}/favoritos/add`, request)
  }

  isFavorited(request: FavoriteRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/favoritos/get`, request)
  }

  deleteFavorite(request: FavoriteRequest) {
    return this.http.delete(`${this.baseUrl}/favoritos/delete`, {body: request})
  }
}
