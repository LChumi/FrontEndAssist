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
import {ErrorResponse} from "@models/error/error-response";
import {forkJoin, Observable} from "rxjs";
import {ServiceResponse} from "@models/record/service-response";
import {CanonicalService} from "@services/state/canonical.service";
import {environment} from "@environments/environment";
import {SeoService} from "@services/state/seo.service";

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
  private canonicalService = inject(CanonicalService)
  private domain = environment.apiUrlBase;
  private seoService = inject(SeoService);

  emailEmpresa = ''; // Email empresarial
  loading = false; // Estado de envío
  haveEmail = false

  id_usuario: any;

  ngOnInit(): void {
    const currentUrl = `${this.domain}${this.router.url}`
    this.canonicalService.updateCanonical(currentUrl);

    const title='Documentos Sri'
    const description='Carga de documentos enviados del SRI'
    this.seoService.update(title, description);

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
      this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No hay archivos para enviar'});
      this.loading = false;
      return;
    }

    const requests: Observable<ServiceResponse>[] = files.map((file: File) =>
      this.contabilidadService.sendFile(file, this.emailEmpresa)
    );

    forkJoin(requests).subscribe({
      next: (responses: ServiceResponse[]) => {
        responses.forEach((response) => {
          if (response.success) {
            this.messageService.add({severity: 'success', summary: 'Envío completado', detail: response.message});
          } else {
            this.messageService.add({severity: 'warn', summary: 'Advertencia', detail: response.message});
          }
        });
        this.loading = false;
      },
      error: (error: ErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });

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
