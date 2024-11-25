import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ImageModule} from "primeng/image";

@Component({
  standalone: true,
  imports: [
    ImageModule
  ],
  templateUrl: './deuna.component.html',
  styles: ``
})
export default class DeunaComponent implements OnInit{

  route = inject(ActivatedRoute)
  usrLiquida: any;
  empresa:any;
  imageBase64: string ='data:image/png;base64,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'

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.usrLiquida = params.get('id')
      this.empresa = params.get('empresa')
    })
    this.parameterIsNumeric(this.usrLiquida)


  }

  parameterIsNumeric(data:string){
    if (data && !/^\d+$/.test(data)){
      console.error('El ID debe ser un numero')
      return;
    }
  }

  checkQrScanned(url: string) {
    // Aquí podrías validar la URL que contiene el QR para determinar si se ha escaneado
    if (url) {
      this.closeQrCode();
    }
  }

  closeQrCode() {
    this.imageBase64 = '';

    if (window && window.close) {
      window.close();
    }
  }

  openAndCloseWindow() {
    const newWindow = window.open('about:blank', '_blank');
    setTimeout(() => {
      // @ts-ignore
      newWindow.close();
    }, 3000);
  }
}
