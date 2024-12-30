import {Component, inject, input, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {Router} from "@angular/router";
import {FavoritesService} from "@services/state/favorites.service";

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    ButtonDirective,
    TooltipModule
  ],
  templateUrl: './favorite.component.html',
  styles: ``
})
export class FavoriteComponent{
  public usrId = input.required<number>();
  public titulo = input.required<string>();

  isFavorite = false

  router = inject(Router);
  favoriteService = inject(FavoritesService)

  toggleFavorite() {
    const currentPath = this.router.url
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.favoriteService.deleteFavorite(1, currentPath)//this.isFavorite false;
    } else {
      this.favoriteService.addFavorite(1, currentPath)//this.isFavorite True;
    }
  }

  checkIfFavorite() {
    const currentPath = this.router.url
    //this.favoriteService.isFavorited(1,currentPath).subscribe(isFav) =>{this.isFavorite = isFav}
  }

}
