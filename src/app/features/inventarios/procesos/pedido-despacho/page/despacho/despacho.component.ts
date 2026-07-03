import {Component, OnInit} from '@angular/core';
import {getSessionItem} from "@utils/storage-utils";
import {
  PendienteListComponent
} from "@features/inventarios/procesos/pedido-despacho/components/pendiente-list/pendiente-list.component";
import {FacDespedidowebV} from "@models/view/fac-despedidoweb-v";
import {
  DespachoDetalleComponent
} from "@features/inventarios/procesos/pedido-despacho/components/despacho-detalle/despacho-detalle.component";

@Component({
  selector: 'app-despacho',
  standalone: true,
  imports: [
    PendienteListComponent,
    DespachoDetalleComponent
  ],
  templateUrl: './despacho.component.html',
  styles: ``
})
export default class DespachoComponent implements OnInit{

  usrId: any
  pedidoSeleccionado: FacDespedidowebV | null = null;

  ngOnInit(): void {
    const username = getSessionItem("username");
    if (username) {
      this.usrId = username
    }
  }

  seleccionarPedido(pedido: FacDespedidowebV){

  }

  cerrarDetalle(){
    this.pedidoSeleccionado = null
  }

}
