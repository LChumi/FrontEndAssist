import {Component, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import {PedidoDespachoService} from "@services/api/models/pedido-despacho.service";
import {ServiceResponse} from "@models/record/service-response";
import {FacDesprodWebV} from "@models/view/fac-desprod-web-v";
import {FacDespedidowebV} from "@models/view/fac-despedidoweb-v";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {TagModule} from "primeng/tag";
import {ImageModule} from "primeng/image";
import {getUrlImage} from "@utils/imageUtils";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {ConfirmationService, MessageService} from "primeng/api";
import {PedidoHojaService} from "@services/api/models/pedido-hoja.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PedidoHojaId} from "@models/dto/pedido-hoja-id";

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
    TableModule,
    TooltipModule,
    ConfirmDialogModule
  ],
  templateUrl: './despacho-detalle.component.html',
  styles: ``
})
export class DespachoDetalleComponent implements OnInit {

  private despachoService = inject(PedidoDespachoService)
  private pedidoHojaSerice = inject(PedidoHojaService)
  private confirmacionService = inject(ConfirmationService)
  private messageService = inject(MessageService)

  productos = signal<FacDesprodWebV[]>([])

  @Output() finalizar = new EventEmitter<ServiceResponse>();
  @Input() pedido!: FacDespedidowebV;

  loading = false

  ngOnInit() {
    this.getProductosDespacho()
  }

  getProductosDespacho() {
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

  confirmarDespacho() {

    const productos = this.productos()

    const tieneCero = productos.some(p => p.canapr === 0);

    const mensaje = tieneCero
      ? '¡Algunos productos tienen cantidad en 0! ¿Desea validar el despacho igualmente?'
      : '¿Desea validar el despacho?';

    this.confirmacionService.confirm({
      key: 'validarDespacho',
      header: 'Confirmar Despacho',
      message: mensaje,
      icon: 'pi pi-exclamation-circle',
      acceptLabel: 'Validar',
      rejectLabel: 'Cancelar',
      accept: () => this.finalizarDespacho()
    });
  }

  finalizarDespacho() {
    const id: PedidoHojaId = {
      empresa: this.pedido.empresa,
      ccoComproba: this.pedido.ccoCodigo,
      hoja: this.pedido.hoja
    }
    this.pedidoHojaSerice.updateHojaEstado(id, 2).subscribe({
      next: response => {
        if (response.success) {
          this.finalizar.emit(response)
          this.messageService.add({
            summary: 'Despacho Validado',
            severity: 'info',
            icon: 'pi pi-check',
            detail: 'El despacho fue validado con exito'
          })
        }
      }
    })
  }

  private actualizarCantidad(
    producto: FacDesprodWebV,
    mensaje: { summary: string; detail: string }
  ) {
    this.despachoService.addCantidad(producto).subscribe({
      next: response => {
        if (response.success) {
          this.messageService.add({
            summary: mensaje.summary,
            severity: 'info',
            icon: 'pi pi-check',
            detail: mensaje.detail
          });
        }
      },
      error: err => {
        this.messageService.add({
          summary: 'Error',
          severity: 'error',
          icon: 'pi pi-times',
          detail: 'No se pudo actualizar la cantidad'
        });
        console.error(err);
      }
    });
  }

  agregarCantidad(producto: FacDesprodWebV) {
    this.actualizarCantidad(producto, {
      summary: 'Cantidad agregada',
      detail: 'Cantidad agregada correctamente'
    });
  }

  completar(producto: FacDesprodWebV) {
    producto.canapr = producto.cdigitada;
    this.actualizarCantidad(producto, {
      summary: 'Cantidad completa',
      detail: 'Producto completado'
    });
  }

  protected readonly getUrlImage = getUrlImage;
}
