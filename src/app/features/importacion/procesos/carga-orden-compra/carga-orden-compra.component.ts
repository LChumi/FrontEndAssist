import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";
import {FileUploadModule} from "primeng/fileupload";
import {MessageService} from "primeng/api";
import {OrdenComrpaListDTO} from "@models/entities/orden-comrpa-list-dto";
import {ImportacionesService} from "@services/api/assist/importaciones.service";
import {SessionService} from "@services/state/session.service";
import {ErrorResponse} from "@models/error/error-response";
import {DecimalPipe, NgClass} from "@angular/common";
import {TableModule} from "primeng/table";
import {Ripple} from "primeng/ripple";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule} from "@angular/forms";
import {SeleccionComprobanteComponent} from "@shared/component/seleccion-comprobante/seleccion-comprobante.component";
import {SolicitudRequestDTO} from "@models/dto/solicitud-request-dto";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {SeleccionBodegasComponent} from "@shared/component/seleccion-bodegas/seleccion-bodegas.component";
import {ModalclienteComponent} from "@shared/component/modalcliente/modalcliente.component";

@Component({
  standalone: true,
  imports: [
    FileUploadModule,
    NgClass,
    TableModule,
    Ripple,
    DecimalPipe,
    ToggleButtonModule,
    FormsModule,
    SeleccionComprobanteComponent,
    DialogModule,
    InputTextModule,
    SeleccionBodegasComponent,
    ModalclienteComponent
  ],
  templateUrl: './carga-orden-compra.component.html',
  styles: ``
})
export default class CargaOrdenCompraComponent implements OnInit, AfterViewInit {

  @ViewChild(ModalclienteComponent) modalcliente!: ModalclienteComponent;

  private route = inject(Router);
  private seoService = inject(SeoService);
  private messageService = inject(MessageService);
  private fileService = inject(ImportacionesService)
  private sessionService = inject(SessionService);
  private domain = environment.domain;

  private idEmpresa: any
  usrId: any;
  seleccionComprobante = false
  observacion = '';
  tipoDoc: number = 120;

  uploadedFiles: any[] = [];
  listaOrdenes: OrdenComrpaListDTO = {listNotSci: [], listWhitSci: []} as OrdenComrpaListDTO;
  proveedor = ''
  listOrders = false
  loading = false;
  modalSci = false;
  modalVisible = false;

  novedadFrozen = false;
  loadingSci = false;

  ngOnInit(): void {
    const currentURL = `${this.domain}${this.route.url}`
    this.seoService.updateCanonical(currentURL);

    const title = 'Orden de compra'
    const description = 'Carga de orden de compra al sistema 1 fase'
    this.seoService.update(title, description);

    const context = this.sessionService.getSessionContext();
    this.idEmpresa = context.idEmpresa;
    this.usrId = context.usrId;
  }

  ngAfterViewInit(): void {
    this.modalcliente.onBtnClick.subscribe(visible => {
      this.modalVisible = visible
    })
    this.modalcliente.onChangeProv.subscribe(prov => {
      this.proveedor = prov
    })
  }

  onUpload(event: any) {
    this.loading = true;

    const files: File[] = event.files;

    if (!files || files.length === 0) {
      this.message('warn', 'Error', 'No hay archivos para enviar');
      this.loading = false;
      return;
    }

    const file = files[0]; // solo tomamos el primero si multiple = false

    this.fileService.sendOrder(file, this.idEmpresa).subscribe({
      next: data => {
        this.listaOrdenes = data;
        this.listOrders = true;
        this.message('info', 'Envío completo', 'Archivo procesado correctamente');
      },
      error: (error: ErrorResponse) => {
        this.message('error', 'Error al procesar el archivo', error.message);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  message(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  handleSaveRequest(event: { request: SolicitudRequestDTO, visible: boolean }) {
    this.loadingSci = true;
    this.seleccionComprobante = event.visible
    console.log(event)

  }

  acceptDialogSci() {
    if (this.observacion === '') {
      this.message('warn', 'Sci sin observacion', 'Ingrese una observacion o numero de tramite')
      return
    }
    this.tipoDoc = 119
    this.seleccionComprobante = true;
    this.modalSci = false;
  }

  accepDialogOrder() {
    this.tipoDoc = 120
    this.seleccionComprobante = true;
  }

  getButtonLabel(): string {
    if (this.proveedor == '') {
      return 'Seleccionar Proveedor'
    } else {
      return this.proveedor
    }
  }

  abrirModal() {
    this.modalVisible = !this.modalVisible;
  }

  protected readonly document = document;
}
