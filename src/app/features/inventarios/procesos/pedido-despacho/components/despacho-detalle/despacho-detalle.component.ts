import {Component, EventEmitter, inject, Input, input, OnInit, Output, signal} from '@angular/core';
import {PedidoDespachoService} from "@services/api/models/pedido-despacho.service";
import {ServiceResponse} from "@models/record/service-response";
import {FacDesprodWebV} from "@models/view/fac-desprod-web-v";
import {FacDespedidowebV} from "@models/view/fac-despedidoweb-v";
import {CurrencyPipe, DatePipe, NgClass} from "@angular/common";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {TagModule} from "primeng/tag";
import {ImageModule} from "primeng/image";
import {getUrlImage} from "@utils/imageUtils";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-despacho-detalle',
  standalone: true,
  imports: [
    DatePipe,
    InputNumberModule,
    FormsModule,
    Button,
    DividerModule,
    TagModule,
    CurrencyPipe,
    ImageModule,
    NgClass,
    TableModule,
    TooltipModule
  ],
  templateUrl: './despacho-detalle.component.html',
  styles: ``
})
export class DespachoDetalleComponent implements OnInit{

  private despachoService = inject(PedidoDespachoService)

  productos = signal<FacDesprodWebV[]>([])

  @Output() finalizar = new EventEmitter<ServiceResponse>();
  @Input() pedido!: FacDespedidowebV;

  loading = false

  ngOnInit() {
    this.getProductosDespacho()
  }

  getProductosDespacho(){
    this.loading = true
    if (this.pedido.hoja) {
      this.despachoService.getProductos(
        this.pedido.empresa,
        this.pedido.ccoCodigo,
        this.pedido.hoja
      ).subscribe({
        next: data => this.productos.set(data),
        error: err => console.error('Error cargando los productos despacho', err),
        complete: () => this.loading = false
      });
    } else {
      this.despachoService.getProductos(
        this.pedido.empresa,
        this.pedido.ccoCodigo
      ).subscribe({
        next: data => this.productos.set(data),
        error: err => console.error('Error cargando los productos despacho', err),
        complete: () => this.loading = false
      });
    }
  }

  finalizarDespacho(){

  }

  protected readonly getUrlImage = getUrlImage;
}
