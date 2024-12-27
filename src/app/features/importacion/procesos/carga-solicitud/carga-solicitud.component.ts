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
    ScrollTopModule
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
      this.proveedor= prov
    })
  }

  idEmpresa : any
  uploadFiles: any[] = []; // Archivos seleccionados

  messageService = inject(MessageService);
  fileService = inject(FileService)
  imagenService = inject(ImagenService)

  listItems : Items[] =[]
  item: Items ={} as Items;

  tipocliente='Proveedor'
  proveedor=''
  imageUrl: string | null = ''

  modalVisible = false;
  loading= false
  itemDialog = false
  deleteItemDialog = false
  confirmDialog = false
  submitted = false

  cantidadAnterior =0;
  cxbAnterior = 0;
  fobAnterior = 0;
  cbmAnterior = 0;

  ngOnInit(): void {
    const empresa = sessionStorage.getItem('empresa')
    if (empresa){
      this.idEmpresa = Number(empresa)
    }
  }

  onUpload(event : any) {
    this.loading= true
    const files = event.files
    if (files.length === 0){
      this.messageService.add({
          severity: 'warm',
          summary:'Error',
          detail: 'No hay archivos para enviar'
        });
      return
    }

    files.forEach((file: File) => {
      this.fileService.sendExcel(file, this.idEmpresa).subscribe({
        next: (response) => {
          if (response.length ==0){
            this.message('warn', 'Advertencia', 'El archivo esta vacio')
            this.loading=false
            this.listItems=[]
          }
          this.message('success', 'Envio completo', 'archivo enviado exitosamente')
          this.listItems = response
          this.loading=false
        },
        error: (error: ErrorResponse) => {
          this.message('error', 'Error', error.message)
          this.listItems=[]
          this.loading=false
        },
      });
    })
  }

  message(severity: string , summary: string, detail:string) {
      this.messageService.add({
        severity: severity,
        summary: summary,
        detail: detail
      });
  }

  abrirModal(){
    this.modalVisible = !this.modalVisible;
  }

  getButtonLabel(): string {
    if (this.proveedor == ''){
      return 'Seleccionar Proveedor'
    } else {
      return this.proveedor
    }
  }

  cargarNuevo(){
    this.listItems =[]
  }

  editItem(item: Items){
    this.item = { ...item }
    this.itemDialog = true
    this.getImagen()
    this.cantidadAnterior = item.cantidad
    this.cbmAnterior = item.cbm
    this.fobAnterior = item.fob
    this.cxbAnterior = item.cxb
  }
  deleteItem(item: Items){
    this.deleteItemDialog = true
    this.item = { ...item }
  }

  confirmDelete(){
    this.deleteItemDialog = false;
    this.listItems = this.listItems.filter(item => item.id !== this.item.id);
    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: 'Item Eliminado', life: 3000 });
    this.item = {} as Items;
  }

  confirmDoc(){
    this.fileService.confirmarSolicitud(this.listItems).subscribe({
      next: (response) => {
        console.log(response)
        this.confirmDialog = false
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se cargo la lista de items', life: 3000 });
        this.listItems = []
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  getImagen(){
    if (this.item){
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
      this.messageService.add({ severity: 'success', summary: 'Realizado', detail: 'Item Actualizado', life: 3000 });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Item no encontrado', life: 3000 });
    }
    this.listItems = [...this.listItems];
    this.itemDialog = false;
    this.item = {} as Items;
  }


  hideDialog(){
    this.itemDialog = false
    this.submitted = false
    this.imageUrl = null
  }

  findIndexById(id:string): number{
    let index = -1;
    for (let i =0; i < this.listItems.length; i++){
      if (this.listItems[i].id === id){
        index = i;
        break;
      }
    }
    return index;
  }
}
