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

@Component({
  standalone: true,
  imports: [
    FileUploadModule,
    PrimeTemplate,
    OrderListModule,
    TableModule,
    Ripple,
    ModalclienteComponent
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

  uploadFiles: any[] = []; // Archivos seleccionados

  messageService = inject(MessageService);
  fileService = inject(FileService)

  listItems : Items[] =[]
  tipocliente='Proveedor'
  proveedor=''
  modalVisible = false;

  loading= false
  idEmpresa : any

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

}
