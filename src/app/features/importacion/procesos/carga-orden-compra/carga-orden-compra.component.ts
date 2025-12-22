import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FileUploadModule} from "primeng/fileupload";
import {ConfirmationService, MessageService} from "primeng/api";
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
import {ListCcomprobaVService} from "@services/api/assist/list-ccomproba-v.service";
import {TooltipModule} from "primeng/tooltip";
import {OverlayPanel, OverlayPanelModule} from "primeng/overlaypanel";
import {ClienteService} from "@services/api/models/cliente.service";
import {SelectionService} from "@services/state/selection.service";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {Items} from "@models/record/items";
import {Trancito} from "@models/record/trancito";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DetalleProductoCcoComponent} from "@shared/component/detalle-producto-cco/detalle-producto-cco.component";
import {ScrollTopModule} from "primeng/scrolltop";
import {SeoHelperService} from "@services/state/seo-helper.service";
import {FavoriteComponent} from "@shared/component/favorite/favorite.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {SkeletonModule} from "primeng/skeleton";
import {SpinnerModule} from "primeng/spinner";

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
    TooltipModule,
    OverlayPanelModule,
    DividerModule,
    CheckboxModule,
    ConfirmDialogModule,
    DetalleProductoCcoComponent,
    ScrollTopModule,
    FavoriteComponent,
    ProgressSpinnerModule,
    SkeletonModule,
    SpinnerModule
  ],
  templateUrl: './carga-orden-compra.component.html',
  styles: ``
})
export default class CargaOrdenCompraComponent implements OnInit {

  @ViewChild(ModalclienteComponent) modalcliente!: ModalclienteComponent;
  @ViewChild('sciSelect') sciSelect!: OverlayPanel;

  private messageService = inject(MessageService);
  private fileService = inject(ImportacionesService)
  private sessionService = inject(SessionService);
  private listCcomprobaService = inject(ListCcomprobaVService)
  private selectionService = inject(SelectionService)
  private clienteService = inject(ClienteService);
  private confirmatioService = inject(ConfirmationService)
  private seoHelper = inject(SeoHelperService);

  uploadedFiles: any[] = [];
  listCco: any[] = [];
  listaOrdenes: OrdenComrpaListDTO = {listNotSci: [], listWhitSci: []} as OrdenComrpaListDTO;
  listaFinal: Items[] = []

  private idEmpresa: any
  usrId: any;
  sciSelected: any
  cco: any

  tipoDoc: number = 120;

  proveedor = '';
  observacion = '';
  solicitud = '';

  seleccionComprobante = false
  listOrders = false
  loading = false;
  novedadFrozen = false;
  displayDialog = false;

  ngOnInit(): void {
    this.seoHelper.setupPageSeo({
      title: 'Orden de compra | Assist Web',
      description: 'Carga de orden de compra al sistema segunda fase',
      schemaTitle: 'ContentPage'
    });

    const context = this.sessionService.getSessionContext();
    this.idEmpresa = context.idEmpresa;
    this.usrId = context.usrId;
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

    this.fileService.sendOrder(file, this.idEmpresa, this.sciSelected.id).subscribe({
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
    this.loading = true;
    this.seleccionComprobante = event.visible
    event.request.items = this.listaFinal
    event.request.ccoRef = this.sciSelected.id
    this.fileService.confirmarOrden(event.request).subscribe({
      next: data => {
        if (data) {
          this.messageService.add({
            severity: 'succes',
            summary: 'Orden Creada',
            detail: `Orden de compra de Importacion Creada satisfactoriamente ${data.comprobante}`,
            life: 3000
          })
          this.reiniciarProceso()
          this.displayDialog = true;
          this.cco = data.cco;
        }
      },
      error: (error: ErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear la orden de importación ' + error.message,
          life: 3000
        });
        this.loading = false
        return;
      }
    })
  }

  getButtonLabel(): string {
    if (this.proveedor == '') {
      return 'Seleccionar Proveedor'
    } else {
      return this.proveedor
    }
  }

  findSCi() {
    this.listCco = [];
    if (this.solicitud === '') {
      this.message('warn', 'Sin solicitud a buscar', 'Ingrese una solicitud a buscar')
      return
    }

    const sigla = 10003347

    this.listCcomprobaService.buscar(
      this.idEmpresa, undefined, undefined, undefined, sigla, undefined, undefined, undefined, this.solicitud, undefined, undefined, undefined).subscribe({
      next: data => {
        if (data.length === 0) {
          this.message('warn', 'No se encontraron solicitudes', 'Sin resultados')
          this.solicitud = ''
          return
        } else {
          for (let doc of data) {
            if (doc.estado == 2) {
              this.listCco.push({
                id: doc.ccoCodigo,
                description: doc.concepto,
                comprobante: doc.dspComproba,
                proveedor: doc.codclipro
              });
            }
          }
          this.solicitud = ''
        }
      }
    })
  }

  buscarSCI(event: Event) {
    if (this.sciSelected) {
      if (this.solicitud.includes(this.solicitud)) {
        this.solicitud = ''
        this.sciSelect.toggle(event)
      }
    } else {
      this.findSCi();
      this.sciSelect.toggle(event)
    }
  }

  seleccionarSciOrigen(event: any): void {
    this.sciSelect.hide();
    this.sciSelected = event.data;
    this.message('success', 'SCI Seleccionado', this.sciSelected.comprobante)
    this.clienteService.getClienteById(this.idEmpresa, this.sciSelected.proveedor).subscribe({
      next: data => {
        this.proveedor = data.nombre
        this.selectionService.actualizarClienteSeleccionado(data.codigo)
        this.getButtonLabel()
      }
    })
  }

  asignarCCoOrigen(item: Items, tranSeleccionado: Trancito, event: Event) {

    const inputElement = event.target as HTMLInputElement;

    const isChecked = inputElement?.checked ?? false;
    // Desmarcar todos
    item.trancitos?.forEach(tran => {
      tran.seleccionado = false;
    });

    if (isChecked) {
      // Marcar el seleccionado y asignar origen
      tranSeleccionado.seleccionado = true;
      item.ccoOrigen = tranSeleccionado.ccomproba;
    } else {
      // Si se desmarca, limpiar origen
      item.ccoOrigen = null;
    }
  }

  //Registra un nuevo documento
  reiniciarProceso() {
    this.sciSelected = null
    this.listOrders = false
    this.loading = false
    this.observacion = ''
    this.listaFinal = []
  }

  procesarOrden() {
    if (this.observacion === '') {
      this.message('warn', 'Sci sin observacion', 'Ingrese una observacion o numero de tramite')
      return
    } else {
      const listaSci = this.listaOrdenes.listWhitSci
      const listaNoSci = this.listaOrdenes.listNotSci

      const listaFusionada = [...listaNoSci, ...listaSci];

      const todosConOrigen = listaFusionada.every(item => !!item.ccoOrigen);

      if (!todosConOrigen) {
        this.confirmatioService.confirm({
          key: 'sinsci',
          message: 'Algunos productos no cuentan con comprobante asignado se asignaran al documento escogido',
          header: 'Validacion',
          icon: 'pi pi-sync',
          accept: () => {
            listaFusionada.forEach(item => {
              if (!item.ccoOrigen) {
                item.ccoOrigen = this.sciSelected.id;
              }
            })
            this.seleccionComprobante = true
            this.listaFinal = listaFusionada
          },
          reject: () => {
            return
          }
        })
      } else {
        this.seleccionComprobante = true
        this.listaFinal = listaFusionada
      }
    }
  }

}
