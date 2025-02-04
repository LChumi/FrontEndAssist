import {Component, inject, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {BodegaDto} from "@models/dto/bodega-dto";
import {FormsModule} from "@angular/forms";
import {UsrBodService} from "@services/api/usr-bod.service";
import {SelectionService} from "@services/state/selection.service";
import {getSessionItem} from "@utils/storage-utils";

@Component({
  selector: 'app-seleccion-bodegas',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule
  ],
  templateUrl: './seleccion-bodegas.component.html',
  styles: ``
})
export class SeleccionBodegasComponent implements OnInit {

  bodegas: BodegaDto[] =[]
  bodegaSelected: BodegaDto ={} as BodegaDto;

  usrBodService = inject(UsrBodService)
  seleccionService = inject(SelectionService)

  ngOnInit(): void {
    const empresa = Number(getSessionItem("empresa"));
    const usrId = Number(getSessionItem("usrId"));
    if (empresa && usrId) {
      this.usrBodService.listBodegas(usrId,empresa).subscribe({
        next: (result) => {
          this.bodegas = result;
          for (let bodega of this.bodegas) {
            if (bodega.bodDefault){
              this.bodegaSelected = bodega
              this.seleccionService.actualizarBodegaSeleccionada(bodega.codigo);
              break;
            }
          }
        }
      })
    }
  }

  onBodegaSelectedChanged(event: any){
    const selectedBodega = event.value;
    this.seleccionService.actualizarBodegaSeleccionada(selectedBodega.codigo);
  }

}
