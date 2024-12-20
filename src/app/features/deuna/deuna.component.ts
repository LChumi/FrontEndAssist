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
export default class DeunaComponent implements OnInit{

  route = inject(ActivatedRoute)
  deunaService = inject(DeunaService);
  confirmatioService = inject(ConfirmationService)
  toast = inject(MessageService);
  private subscription: Subscription | null = null;

  usrLiquida: any;
  empresa:any;
  imageBase64: string | null = '';
  value =0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.usrLiquida = params.get('id')
      this.empresa = params.get('empresa')
    })
    this.parameterIsNumeric(this.usrLiquida)
    //this.obtenerQr()
  }

  parameterIsNumeric(data:string){
    if (data && !/^\d+$/.test(data)){
      console.error('El ID debe ser un numero')
      return;
    }
  }

  obtenerQr(){
    this.deunaService.generarPago(this.usrLiquida, this.empresa).subscribe(
      data => {
        if(data.qr){
          this.imageBase64 = data.qr
          this.validarQr()
        }
      }
    )
  }

  validarQr(){
    this.value = 0;
    const intervalTime = 2000; // 2 segundos
    const maxTime = 60000; // 1 1/2 minuto
    const steps = maxTime / intervalTime;
    const increment = 100 / steps;

    this.subscription = interval(intervalTime).subscribe(() => {
      this.value += increment;
      if (this.value >= 100) {
        this.subscription?.unsubscribe();
      }
    });
    this.deunaService.validarPago(this.usrLiquida, this.empresa).subscribe({
      next: data => {
        if(/APPROVED/.test(data.status)){
          this.confirm()
          this.value=100
          this.subscription?.unsubscribe();
          this.cleanData()
        }
      },
      error: (error: ErrorResponse) => {
        this.error(error.message)
        this.cleanData()
      }
    });
  }

  confirm(){
    this.confirmatioService.confirm({
      message: 'El pago fue realizado exitosamente por favor cierre la ventana',
      header: 'Confirmacion',
      icon: 'pi pi-window-minimize',
      accept: () =>{
        this.toast.add({key: 'tst', severity: 'info', summary: 'Gracias por usar DeUna Pagos', detail: 'Cierre la ventana por favor'})
      }
    })
  }

  error(error:any){
    this.confirmatioService.confirm({
      message: 'Tiempo de espera agotado',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-circle',
      accept: () =>{
        this.toast.add({key: 'tst', severity: 'warn', summary: error, detail: 'Cierre la ventana por favor'})
      }
    })
  }

  cleanData(){
    this.imageBase64 = null
    this.usrLiquida = null
    this.empresa = null
  }

}
