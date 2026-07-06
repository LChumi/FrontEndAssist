import {Component, OnInit} from '@angular/core';
import {getSessionItem} from "@utils/storage-utils";
import {
  PendienteListComponent
} from "@features/inventarios/procesos/pedido-despacho/components/pendiente-list/pendiente-list.component";

@Component({
  selector: 'app-despacho',
  standalone: true,
  imports: [
    PendienteListComponent
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
