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
  imageBase64: string | null=''

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
    //validar la URL que contiene el QR
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

}
