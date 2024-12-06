import {Component, inject, OnInit} from '@angular/core';
import {FileUploadModule} from "primeng/fileupload";
import {MessageService, PrimeTemplate} from "primeng/api";
import {FileService} from "@services/file.service";
import {Items} from "@models/record/items";
import {OrderListModule} from "primeng/orderlist";
import {TableModule} from "primeng/table";
import {Ripple} from "primeng/ripple";

@Component({
  standalone: true,
  imports: [
    FileUploadModule,
    PrimeTemplate,
    OrderListModule,
    TableModule,
    Ripple
  ],
  templateUrl: './carga-solicitud.component.html',
  styles: ``
})
export default class CargaSolicitudComponent implements OnInit{

  uploadFiles: any[] = []; // Archivos seleccionados

  messageService = inject(MessageService);
  fileService = inject(FileService)

  listItems : Items[] =[]

  loading= false
  idEmpresa : any

  ngOnInit(): void {
    const empresa = sessionStorage.getItem('empresa')
    if (empresa){
      this.idEmpresa = Number(empresa)
    }
  }

  onUpload(event : any) {
    const files = event.files
    if (files.length === 0){
      this.messageService.add({
          severity: 'warm',
          summary:'Error',
          detail: 'No hay archivos para enviar'
        });
      return
    }

    this.loading= true
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

}
