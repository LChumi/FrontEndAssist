import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ImageModule} from "primeng/image";
import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {JepfasterService} from "@services/api/jepFasterServices/jepfaster.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {parameterIsNumeric} from "@utils/params-utils";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [
    ConfirmDialogModule,
    ImageModule,
    ProgressBarModule,
    ToastModule
  ],
  templateUrl: './jep-faster.component.html',
  styles: ``
})
export class JepFasterComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private jepService = inject(JepfasterService);
  private confirmacionService = inject(ConfirmationService);
  private toast = inject(MessageService);
  private titleService = inject(Title)
  private metaService = inject(Meta)

  protected usrLiquida: any;
  protected empresa: any;

  private static base64= 'data:image/png;base64,'
  protected imageBase64: string | null = null

  ngOnInit(): void {
    this.titleService.setTitle("JEPFaster");
    this.metaService.updateTag({
      name: 'description',
      content: 'JEPFaster compra y paga desde tu celular',
    })
    this.route.paramMap.subscribe(params => {
      this.usrLiquida = params.get('id')
      this.empresa = params.get('empresa')
    })
    if (!parameterIsNumeric(this.usrLiquida)){
      return;
    }
    this.verificarPagoJep()
  }

  verificarPagoJep() {
    this.jepService.verificarPago(this.usrLiquida, this.empresa).subscribe({
      next: data => {
        if (data.success){
          this.confirm()
        }else{
          this.obtenerQr()
        }
      },
      error: err => {
        this.error(err.message, err.message)
        return;
      }
    })
  }

  obtenerQr() {
    this.jepService.generarQr(this.usrLiquida, this.empresa).subscribe({
      next: data => {
        if (data.data && data.data.qr) {
          this.imageBase64 = JepFasterComponent.base64+data.data.qr
          this.validarQr()
        }
      },
      error: err => {
        this.error(err.message, 'Ocurrió un problema con el servicio JepFaster.')
      }
    })
  }

  validarQr() {
    this.jepService.validarPago(this.usrLiquida, this.empresa).subscribe({
      next: data => {
        if (data.success) {
          this.confirm()
          this.cleanData()
        }
      },
      error: (error: any) => {
        this.error(error.message, 'Tiempo de espera agotado')
        this.cleanData()
      }
    })
  }

  confirm() {
    this.confirmacionService.confirm({
      key: 'jepFast',
      message: 'El pago fue realizado exitosamente por favor cierre la ventana',
      header: 'Confirmacion',
      icon: 'pi pi-window-minimize',
      accept: () => {
        this.toast.add({
          key: 'tst',
          severity: 'info',
          summary: 'Gracias por usar JepFaster',
          detail: 'Cierre la ventana por favor'
        })
      }
    })
  }

  error(error: any, message: string) {
    this.confirmacionService.confirm({
      key: 'jepFast',
      message: message,
      header: 'Advertencia',
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
