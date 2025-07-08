import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ImageModule} from "primeng/image";
import {DeunaService} from "@services/api/deUnaServices/deuna.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {FileUploadModule} from "primeng/fileupload";
import {interval, Subscription} from "rxjs";
import {ErrorResponse} from "@models/error/error-response";
import { parameterIsNumeric } from "@utils/index";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [
    ImageModule,
    ConfirmDialogModule,
    ToastModule,
    FileUploadModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './deuna.component.html',
  styles: ``
})
export default class DeunaComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private deunaService = inject(DeunaService);
  private confirmatioService = inject(ConfirmationService)
  private toast = inject(MessageService);
  private titleService = inject(Title)
  private metaService = inject(Meta)

  private subscription: Subscription | null = null;

  protected usrLiquida: any;
  protected empresa: any;
  protected imageBase64: string | null = '';
  private value = 0;

  ngOnInit(): void {
    this.titleService.setTitle("Pagos DeUna!");
    this.metaService.updateTag({
      name: 'description',
      content: 'Tu app de pagos fácil y segura',
    })

    this.route.paramMap.subscribe(params => {
      this.usrLiquida = params.get('id')
      this.empresa = params.get('empresa')
    })
   if(!parameterIsNumeric(this.usrLiquida)){
     return;
   }
    this.verificarPago()
  }


  obtenerQr() {
    this.deunaService.generarPago(this.usrLiquida, this.empresa).subscribe({
      next: data => {
        if (data.qr) {
          this.imageBase64 = data.qr
          this.validarQr()
        }
      },
      error: err => {
        this.error(err.message, 'Ocurrió un problema con el servicio DeUnaPagos.')
      }
    })
  }

  verificarPago() {
    this.deunaService.verificarPago(this.usrLiquida, this.empresa).subscribe({
      next: data => {
        if (data.success){
          this.confirm()
        }else{
          this.obtenerQr()
        }
      },
      error: err => {
        this.error(err.message, err.message)
      }
    })
  }

  validarQr() {
    this.value = 0;
    const intervalTime = 2000; // 2 segundos
    const maxTime = 36000; // 3 minuto
    const steps = maxTime / intervalTime;
    const increment = 100 / steps;

    this.subscription = interval(intervalTime).subscribe(() => {
      this.value += increment;
      console.log(this.value)
      if (this.value >= 100) {
        this.subscription?.unsubscribe();
      }
    });
    this.deunaService.validarPago(this.usrLiquida, this.empresa).subscribe({
      next: data => {
        if (/APPROVED/.test(data.status)) {
          this.confirm()
          this.value = 100
          this.subscription?.unsubscribe();
          this.cleanData()
        }
      },
      error: (error: ErrorResponse) => {
        this.error(error.message, 'Tiempo de espera agotado')
        this.cleanData()
      }
    });
  }

  confirm() {
    this.confirmatioService.confirm({
      key: 'deuna',
      message: 'El pago fue realizado exitosamente por favor cierre la ventana',
      header: 'Confirmacion',
      icon: 'pi pi-window-minimize',
      accept: () => {
        this.toast.add({
          key: 'tst',
          severity: 'info',
          summary: 'Gracias por usar DeUna Pagos',
          detail: 'Cierre la ventana por favor'
        })
      }
    })
  }

  error(error: any, message: string) {
    this.confirmatioService.confirm({
      key: 'deuna',
      message: message,
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-circle',
      accept: () => {
        this.toast.add({key: 'tst', severity: 'warn', summary: error, detail: 'Cierre la ventana por favor'})
      }
    })
  }

  cleanData() {
    this.imageBase64 = null
    this.usrLiquida = null
    this.empresa = null
  }

}
