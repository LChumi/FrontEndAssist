import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private clienteSelectionSource = new BehaviorSubject<number>(0);
  private empresaSelectionSource = new BehaviorSubject<number>(0);



  clienteSeleccionado$ = this.clienteSelectionSource.asObservable();
  empresaSeleccionada$ = this.empresaSelectionSource.asObservable();

  constructor() { }

  actualizarClienteSeleccionado(id: number){
    this.clienteSelectionSource.next(id);
  }

  actualizarEmpresaSeleccionado(id: number){
    console.log(id)
    this.empresaSelectionSource.next(id);
  }
}
