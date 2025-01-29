import {Component, OnInit} from '@angular/core';
import {getSessionItem} from "@utils/storage-utils";

@Component({
  standalone: true,
  imports: [],
  templateUrl: './visualizacion-carga.component.html',
  styles: ``
})
export default class VisualizacionCargaComponent implements OnInit {

  protected empresa: any
  protected documento: any;

  ngOnInit(): void {
    const nombre =getSessionItem('nombreEmpresa')
    const doc = getSessionItem('SCI')
    if (nombre && doc) {
      this.empresa = nombre;
      this.documento = doc;
    }
  }

}
