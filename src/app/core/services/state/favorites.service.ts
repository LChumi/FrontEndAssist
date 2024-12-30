import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  http = inject(HttpClient)

  constructor() { }

  addFavorite(usrId: number, path:string) {

  }

  deleteFavorite(usrId: number, path:string) {

  }

  getFavorites(usrId: number) {

  }

  isFavorited(usrId: number, path:string) {

  }
}
