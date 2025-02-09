import {Component, inject, OnInit} from '@angular/core';
import {FileUploadModule} from "primeng/fileupload";
import {MessageService} from "primeng/api";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Ripple} from "primeng/ripple";
import {ContabilidadService} from "@services/api/contabilidad.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {FavoriteComponent} from "@shared/component/favorite/favorite.component";
import {getSessionItem} from "@utils/index";

@Component({
  standalone: true,
  imports: [
    FileUploadModule,
    InputTextareaModule,
    Ripple,
    FormsModule,
    FavoriteComponent
  ],
  templateUrl: './carga-documentos.component.html',
  styles: ``
})
export default class CargaDocumentosComponent implements OnInit {

  uploadFiles: any[] = []; // Archivos seleccionados
  textContent: string = ''; // Texto ingresado en el textarea

  private messageService = inject(MessageService);
  private contabilidadService = inject(ContabilidadService);
  private router = inject(Router)

  emailEmpresa = ''; // Email empresarial
  loading = false; // Estado de envío
  haveEmail = false

  id_usuario: any;

  ngOnInit(): void {
    this.id_usuario = getSessionItem('usrId')
    if (this.id_usuario == '') {
      this.router.navigate(['/assist', 'auth', 'login']).then(r => {
      })
    }
    this.obtenerCorreoEmpresarial()
  }

  uploadFilesDirectly(event: any) {
    this.loading = true;
    const files = event.files;
    if (files.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'No hay archivos para enviar'
      });
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    files.forEach((file: File) => {
      this.contabilidadService.sendFile(file, this.emailEmpresa).subscribe({
        next: success => {
          if (success) {
            successCount++;
          } else {
            errorCount++;
          }
          this.checkBatchCompletion(successCount, errorCount, files.length);
        },
        error: error => {
          console.error('Error enviando archivo:', file.name, error);
          errorCount++;
          this.checkBatchCompletion(successCount, errorCount, files.length);
        }
      });
    });
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

  onFilesSelected(event: any) {
    console.log('Archivos seleccionados:', event.files);
  }


  uploadString(data: string) {
    if (!data.trim()) {
      this.messageService.add({severity: 'warn', summary: 'Error', detail: 'El texto no puede estar vacío'});
      return;
    }

    this.loading = true;
    this.contabilidadService.sendString(data, this.emailEmpresa).subscribe(
      success => {
        this.messageService.add({
          severity: success ? 'success' : 'error',
          summary: success ? 'Éxito' : 'Error',
          detail: success ? 'Texto enviado correctamente' : 'Error al enviar el texto'
        });
        this.loading = false;
        this.textContent = ''; // Limpiar textarea tras el envío
      },
      error => {
        console.error('Error al enviar el texto', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al enviar el texto'});
        this.loading = false;
      }
    );
  }

  obtenerCorreoEmpresarial() {
    this.contabilidadService.getEmpleado(this.id_usuario).subscribe(
      empleado => {
        if (empleado) {
          if (empleado.mailEmpresa) {
            this.emailEmpresa = empleado.mailEmpresa
            this.haveEmail = true;
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Error',
              detail: 'El email empresarial es obligatorio'
            });
            console.log('Es empleado sin correo ')
            this.haveEmail = false;
            return;
          }
        } else {
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'El email empresarial es obligatorio'});
          this.haveEmail = false;
        }
      }
    )
  }
}
