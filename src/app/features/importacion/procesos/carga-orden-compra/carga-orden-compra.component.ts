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
import {ListCcomprobaVService} from "@services/api/assist/list-ccomproba-v.service";
import {TooltipModule} from "primeng/tooltip";
import {OverlayPanel, OverlayPanelModule} from "primeng/overlaypanel";
import {ClienteService} from "@services/api/models/cliente.service";
import {SelectionService} from "@services/state/selection.service";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {Items} from "@models/record/items";
import {Trancito} from "@models/record/trancito";

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
    CheckboxModule
  ],
  templateUrl: './carga-orden-compra.component.html',
  styles: ``
})
export default class CargaOrdenCompraComponent implements OnInit, AfterViewInit {

  @ViewChild(ModalclienteComponent) modalcliente!: ModalclienteComponent;
  @ViewChild('sciSelect') sciSelect!: OverlayPanel;

  private route = inject(Router);
  private seoService = inject(SeoService);
  private messageService = inject(MessageService);
  private fileService = inject(ImportacionesService)
  private sessionService = inject(SessionService);
  private listCcomprobaService = inject(ListCcomprobaVService)
  private selectionService = inject(SelectionService)
  private clienteService = inject(ClienteService);
  private domain = environment.domain;

  uploadedFiles: any[] = [];
  listCco: any[] =[];
  listaOrdenes: OrdenComrpaListDTO = {listNotSci: [], listWhitSci: []} as OrdenComrpaListDTO;

  private idEmpresa: any
  usrId: any;
  sciSelected : any

  tipoDoc: number = 120;

  proveedor = '';
  observacion = '';
  solicitud = '';

  seleccionComprobante = false
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

    this.fileService.sendOrder(file, this.idEmpresa, this.sciSelected.id).subscribe({
      next: data => {
        console.log(data);
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

  acceptDialogOrder() {
    if (this.observacion === '') {
      this.message('warn', 'Sci sin observacion', 'Ingrese una observacion o numero de tramite')
      return
    }
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

  findSCi(){
    this.listCco = [];
    if (this.solicitud === ''){
      this.message('warn', 'Sin solicitud a buscar', 'Ingrese una solicitud a buscar')
      return
    }

    const sigla = 10003347

    this.listCcomprobaService.buscar(
      this.idEmpresa, undefined, undefined, undefined, sigla, undefined, undefined, undefined, this.solicitud, undefined, undefined, undefined).subscribe({
      next: data => {
        for (let doc of data) {
          this.listCco.push({
            id: doc.ccoCodigo,
            description: doc.concepto,
            comprobante: doc.dspComproba,
            proveedor: doc.codclipro
          });
        }
      }
    })
  }

  handleSearch(event: Event){
    if (this.sciSelected){
      if (this.solicitud.includes(this.solicitud)){
        console.log('Input coincide con el concepto del comprobante')
        this.sciSelect.toggle(event)
      }
    } else {
      this.findSCi();
      this.sciSelect.toggle(event)
    }
  }

  handleRowSelect(event: any): void {
    this.sciSelect.hide();
    this.sciSelected = event.data;
    this.message('success', 'SCI Seleccionado', this.sciSelected.comprobante)
    this.clienteService.getClienteById(this.idEmpresa,this.sciSelected.proveedor).subscribe({
      next: data => {
        this.proveedor = data.nombre
        this.selectionService.actualizarAlmacenSeleccionado(data.codigo)
        this.getButtonLabel()
      }
    })
  }

  asignarCCoOrigen(item: Items, tranSeleccionado: Trancito) {
    // Desmarcar todos los tránsitos
    item.trancitos?.forEach(tran => {
      tran.seleccionado = false;
    });

    // Marcar solo el seleccionado
    tranSeleccionado.seleccionado = true;

    // Asignar el origen al item
    item.ccoOrigen = tranSeleccionado.ccomproba;
  }



  limpiarAsignaciones(items: Items[]): void {
    items.forEach(item => {
      item.trancitos?.forEach(tr => tr.seleccionado = false);
      item.ccoOrigen = null;
    });
    console.log('Todas las asignaciones han sido limpiadas');
  }



}
