import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {FileUploadModule} from "primeng/fileupload";
import {MessageService, PrimeTemplate} from "primeng/api";
import {FileService} from "@services/api/file.service";
import {Items} from "@models/record/items";
import {OrderListModule} from "primeng/orderlist";
import {TableModule} from "primeng/table";
import {Ripple} from "primeng/ripple";
import {ErrorResponse} from "@models/error/error-response";
import {ModalclienteComponent} from "@features/shared/component/modalcliente/modalcliente.component";
import {DialogModule} from "primeng/dialog";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {DecimalPipe, NgClass} from "@angular/common";
import {ImagenService} from "@services/api/images/imagen.service";
import {ScrollTopModule} from "primeng/scrolltop";
import {FavoriteComponent} from "@features/shared/component/favorite/favorite.component";
import {
  SeleccionComprobanteComponent
} from "@features/shared/component/seleccion-comprobante/seleccion-comprobante.component";
import {getSessionItem, setSessionItem} from "@utils/index";
import {SeleccionBodegasComponent} from "@features/shared/component/seleccion-bodegas/seleccion-bodegas.component";
import {SolicitudRequestDTO} from "@models/dto/solicitud-request-dto";
import {Router} from "@angular/router";

@Component({
  standalone: true,
  imports: [
    FileUploadModule,
    PrimeTemplate,
    OrderListModule,
    TableModule,
    Ripple,
    ModalclienteComponent,
    DialogModule,
    ChipsModule,
    FormsModule,
    NgClass,
    DecimalPipe,
    ScrollTopModule,
    FavoriteComponent,
    SeleccionComprobanteComponent,
    SeleccionBodegasComponent
  ],
  templateUrl: './carga-solicitud.component.html',
  styles: ``
})
export default class CargaSolicitudComponent implements OnInit, AfterViewInit {

  @ViewChild(ModalclienteComponent) modalcliente!: ModalclienteComponent;

  ngAfterViewInit() {
    this.modalcliente.onBtnClick.subscribe(visible => {
      this.modalVisible = visible
    })
    this.modalcliente.onChangeProv.subscribe(prov => {
      this.proveedor = prov
    })
  }

  private idEmpresa: any
  usrId: any
  protected uploadFiles: any[] = []; // Archivos seleccionados

  private messageService = inject(MessageService);
  private fileService = inject(FileService)
  private imagenService = inject(ImagenService)
  private route = inject(Router)

  listItems: Items[] = []
  item: Items = {} as Items;

  proveedor = ''
  imageUrl: string | null = ''

  observacion: string = ''

  modalVisible = false;
  loading = false
  itemDialog = false
  deleteItemDialog = false
  confirmDialog = false
  submitted = false
  seleccionComprobante = false

  cantidadAnterior = 0;
  cxbAnterior = 0;
  fobAnterior = 0;
  cbmAnterior = 0;

  ngOnInit(): void {
    const empresa = getSessionItem('empresa')
    const usrId: any = getSessionItem('usrId')
    if (empresa && usrId) {
      this.idEmpresa = Number(empresa)
      this.usrId = Number(usrId)
    }
  }

  onUpload(event: any) {
    this.loading = true
    const files = event.files
    if (files.length === 0) {
      this.messageService.add({
        severity: 'warm',
        summary: 'Error',
        detail: 'No hay archivos para enviar'
      });
      return
    }

    files.forEach((file: File) => {
      this.fileService.sendExcel(file, this.idEmpresa).subscribe({
        next: (response) => {
          if (response.length == 0) {
            this.message('warn', 'Advertencia', 'El archivo esta vacio')
            this.loading = false
            this.listItems = []
          }
          this.message('success', 'Envio completo', 'archivo enviado exitosamente')
          this.listItems = response
          this.loading = false
        },
        error: (error: ErrorResponse) => {
          this.message('error', 'Error', error.message)
          this.listItems = []
          this.loading = false
        },
      });
    })
  }

  message(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  abrirModal() {
    this.modalVisible = !this.modalVisible;
  }

  getButtonLabel(): string {
    if (this.proveedor == '') {
      return 'Seleccionar Proveedor'
    } else {
      return this.proveedor
    }
  }

  cargarNuevo() {
    this.listItems = []
  }

  editItem(item: Items) {
    this.item = {...item}
    this.itemDialog = true
    this.getImagen()
    this.cantidadAnterior = item.cantidad
    this.cbmAnterior = item.cbm
    this.fobAnterior = item.fob
    this.cxbAnterior = item.cxb
  }

  deleteItem(item: Items) {
    this.deleteItemDialog = true
    this.item = {...item}
  }

  confirmDelete() {
    this.deleteItemDialog = false;
    this.listItems = this.listItems.filter(item => item.id !== this.item.id);
    this.messageService.add({severity: 'success', summary: 'Realizado', detail: 'Item Eliminado', life: 3000});
    this.item = {} as Items;
  }

  getImagen() {
    if (this.item) {
      this.imagenService.getImagen(this.item.id).subscribe({
        next: (response) => {
          this.imageUrl = URL.createObjectURL(response);
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }

  saveItem() {
    this.submitted = true
    const index = this.findIndexById(this.item.id);
    if (index !== -1) {
      this.item.cantidadTotal = this.item.cantidad * this.item.cxb
      this.item.cbmTotal = this.item.cbm * this.item.cantidad
      this.item.fobTotal = this.item.fob * this.item.cantidadTotal
      this.listItems[index] = this.item;
      this.messageService.add({severity: 'success', summary: 'Realizado', detail: 'Item Actualizado', life: 3000});
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Item no encontrado', life: 3000});
    }
    this.listItems = [...this.listItems];
    this.itemDialog = false;
    this.item = {} as Items;
  }


  hideDialog() {
    this.itemDialog = false
    this.submitted = false
    this.imageUrl = null
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.listItems.length; i++) {
      if (this.listItems[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  aceptDialog() {
    this.confirmDialog = false;
    this.seleccionComprobante = true;
  }

  handleSaveRequest(event: { request: SolicitudRequestDTO, visible: boolean }) {
    event.request.items = this.listItems
    this.seleccionComprobante = event.visible;
    this.fileService.confirmarSolicitud(event.request).subscribe({
      next: (response) => {
        this.observacion = ''
        this.messageService.add({severity: 'success', summary: 'CREADO', detail: 'SOLICITUD DE IMPORTACIÓN: '+ response, life: 3000});
        this.route.navigate(['/assist', 'inicio', 'importaciones', 'visualizar-solicitud'], {queryParams: {cco: '100000000000000000004599851'}}).then(r => {})
      },
      error: (error: ErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo crear la solicitud de importación ' + error.message, life: 3000});
      }
    })
    this.cargarNuevo()
  }
}
