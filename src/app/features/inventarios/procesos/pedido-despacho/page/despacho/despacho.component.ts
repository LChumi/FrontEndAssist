import {Component, OnInit} from '@angular/core';
import {getSessionItem} from "@utils/storage-utils";
import {
  PendienteListComponent
} from "@features/inventarios/procesos/pedido-despacho/components/pendiente-list/pendiente-list.component";
import {FavoriteComponent} from "@shared/component/favorite/favorite.component";

@Component({
  selector: 'app-despacho',
  standalone: true,
  imports: [
    PendienteListComponent,
    FavoriteComponent
  ],
  templateUrl: './despacho.component.html',
  styles: ``
})
export default class DespachoComponent implements OnInit {

  usrId: any

  ngOnInit(): void {
    const username = getSessionItem("username");
    if (username) {
      this.usrId = username
    }
  }

}
