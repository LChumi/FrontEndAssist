import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {FileUploadModule} from "primeng/fileupload";
import {MessageService, PrimeTemplate} from "primeng/api";
import {FileService} from "@services/api/file.service";
import {Items} from "@models/record/items";
import {OrderListModule} from "primeng/orderlist";
import {TableModule} from "primeng/table";
import {Ripple} from "primeng/ripple";
import {ModalclienteComponent} from "../../../shared/component/modalcliente/modalcliente.component";

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
    let successCount =0;
    let errorCount =0;

    files.forEach((file: File) => {
      this.fileService.sendExcel(file, this.idEmpresa).subscribe({
        next: succes => {
          if (succes){
            successCount++
            this.listItems = succes
          } else {
            errorCount++;
          }
          this.checkBatchCompletion(successCount, errorCount, files.length);
        },
        error: error => {
          errorCount++;
        }
      })
    })
  }

  checkBatchCompletion(successCount: number, errorCount: number, totalFiles: number) {
    if (successCount + errorCount === totalFiles) {
      this.loading = false;

      const summary = `${successCount} archivo(s) enviado(s) exitosamente, ${errorCount} error(es).`;
      this.messageService.add({
        severity: errorCount > 0 ? 'warn' : 'success',
        summary: 'Envío completado',
        detail: summary
      });
    }
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

}
