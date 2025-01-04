import {Component, inject, input, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {Router} from "@angular/router";
import {FavoritesService} from "@services/state/favorites.service";
import {FavoriteRequest} from "@models/record/favorite-request";

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
export class FavoriteComponent implements OnInit {
  public usrId = input.required<number>();
  public titulo = input.required<string>();

  isFavorite = false

  router = inject(Router);
  favoriteService = inject(FavoritesService)

  favoriteRequest: FavoriteRequest ={} as FavoriteRequest;

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoriteService.deleteFavorite(this.favoriteRequest).subscribe(() => {
        this.isFavorite = false;
      })
    } else {
      this.favoriteService.addFavorite(this.favoriteRequest).subscribe(() => {
        this.isFavorite = true;
      })
    }
  }

  checkIfFavorite() {
    const currentPath = this.router.url
    this.favoriteService.isFavorited(this.favoriteRequest).subscribe(
      isFavorite => {
        this.isFavorite = isFavorite;
      }
    )
  }

  ngOnInit(): void {
    const currentPath = this.router.url
    const empresaId = Number(sessionStorage.getItem("empresa"));
    this.favoriteRequest = {
      empresa: empresaId,
      path: currentPath,
      idUsuario: this.usrId()
    }
    this.checkIfFavorite()
  }

}
