import {Component, inject, input, OnInit, signal} from '@angular/core';
import {GestionPedidosService} from "@services/api/models/gestion-pedidos.service";
import {FacDespedidowebV} from "@models/view/fac-despedidoweb-v";
import {TableModule} from "primeng/table";
import {DatePipe} from "@angular/common";
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";
import {TagModule} from "primeng/tag";
import {
  DespachoDetalleComponent
} from "@features/inventarios/procesos/pedido-despacho/components/despacho-detalle/despacho-detalle.component";
import {ServiceResponse} from "@models/record/service-response";

@Component({
  selector: 'app-pendiente-list',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    ButtonDirective,
    Ripple,
    TooltipModule,
    TagModule,
    DespachoDetalleComponent,
    Button
  ],
  templateUrl: './pendiente-list.component.html',
  styles: ``
})
export class PendienteListComponent implements OnInit {

  private despachoService = inject(GestionPedidosService)

  pendientes = signal<FacDespedidowebV[]>([]);

  usuarioId = input.required<string>();
  estado = input.required<number>();

  loading = false
  pedidoSeleccionado: FacDespedidowebV | null = null;

  ngOnInit() {
    this.getPendientes();
  }

  getPendientes() {
    this.despachoService.getPendientes(this.usuarioId(), this.estado()).subscribe({
      next: data => {
        this.pendientes.set(data)
      },
      error: err => console.error('Error cargando pendientes', err)
    })
  }

  verPedido(pedido: FacDespedidowebV) {
    this.pedidoSeleccionado = pedido
  }

  cerrarDetalle() {
    this.pedidoSeleccionado = null
  }

  recargar(response: ServiceResponse) {
    if (response.success) {
      this.cerrarDetalle();
      this.getPendientes();
    }
  }

}
