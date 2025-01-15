import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private clienteSelectionSource = new BehaviorSubject<number>(0);
  private empresaSelectionSource = new BehaviorSubject<number>(0);
  private almacenSelectionSource = new BehaviorSubject<number>(0);

  clienteSeleccionado$ = this.clienteSelectionSource.asObservable();
  empresaSeleccionada$ = this.empresaSelectionSource.asObservable();
  almacenSeleccionado$ = this.almacenSelectionSource.asObservable();

  constructor() {
  }

  actualizarClienteSeleccionado(id: number) {
    this.clienteSelectionSource.next(id);
  }

  actualizarEmpresaSeleccionado(id: number) {
    this.empresaSelectionSource.next(id);
  }

  actualizarAlmacenSeleccionado(id: number) {
    this.almacenSelectionSource.next(id);
  }
}
