import {Component, inject} from '@angular/core';
import {FileUploadModule} from "primeng/fileupload";
import {MessageService, PrimeTemplate} from "primeng/api";

@Component({
  standalone: true,
  imports: [
    FileUploadModule,
    PrimeTemplate
  ],
  templateUrl: './carga-solicitud.component.html',
  styles: ``
})
export default class CargaSolicitudComponent {

  uploadFiles: any[] = []; // Archivos seleccionados
  messageService = inject(MessageService);


  onUpload(event : any) {
    for(let file of event.files) {
      this.uploadFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

}
