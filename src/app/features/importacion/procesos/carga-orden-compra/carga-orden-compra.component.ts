import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";
import {FileUploadModule} from "primeng/fileupload";
import {MessageService} from "primeng/api";
import {OrdenComrpaListDTO} from "@models/entities/orden-comrpa-list-dto";
import {FileService} from "@services/api/file.service";
import {SessionService} from "@services/state/session.service";
import {ErrorResponse} from "@models/error/error-response";
import {DecimalPipe, NgClass} from "@angular/common";
import {TableModule} from "primeng/table";
import {Ripple} from "primeng/ripple";

@Component({
  standalone: true,
  imports: [
    FileUploadModule,
    NgClass,
    TableModule,
    Ripple,
    DecimalPipe
  ],
  templateUrl: './carga-orden-compra.component.html',
  styles: ``
})
export default class CargaOrdenCompraComponent implements OnInit {

  private route = inject(Router);
  private seoService = inject(SeoService);
  private messageService = inject(MessageService);
  private fileService = inject(FileService)
  private sessionService = inject(SessionService);
  private domain = environment.domain;

  private idEmpresa: any
  usrId: any;

  uploadedFiles: any[] = [];
  listaOrdenes : OrdenComrpaListDTO = { listNotSci : [] , listWhitSci : []} as OrdenComrpaListDTO;
  proveedor = ''
  loading = false;

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

}
