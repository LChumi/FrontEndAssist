import {Component, EventEmitter, inject, input, OnInit, Output, signal} from '@angular/core';
import {PedidoDespachoService} from "@services/api/models/pedido-despacho.service";
import {FacDespedidowebV} from "@models/view/fac-despedidoweb-v";
import {TableModule} from "primeng/table";
import {DatePipe} from "@angular/common";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-pendiente-list',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    ButtonDirective,
    Ripple,
    TooltipModule,
    TagModule
  ],
  templateUrl: './pendiente-list.component.html',
  styles: ``
})
export class PendienteListComponent implements OnInit{

  private despachoService = inject(PedidoDespachoService)

  pendientes = signal<FacDespedidowebV[]>([]);

  usuarioId = input.required<string>();
  estado = input.required<number>();

  @Output() seleccionar = new EventEmitter<FacDespedidowebV>();

  loading = false

  ngOnInit() {
    this.getPendientes();
  }

  getPendientes(){
    this.despachoService.getPendientes(this.usuarioId(), this.estado()).subscribe({
      next: data => {
        this.pendientes.set(data)
        console.log(data)
      },
      error: err => console.error('Error cargando pendientes', err)
    })
  }

  verPedido(pedido: FacDespedidowebV){
    this.seleccionar.emit(pedido)
  }

}
