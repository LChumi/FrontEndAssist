import {Component, EventEmitter, inject, input, Input, OnInit, Output} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {SelectItem} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {SelectionService} from "@services/state/selection.service";
import {ClienteService} from "@services/api/cliente.service";
import {Cliente} from "@models/entities/cliente";
import {Table, TableModule} from "primeng/table";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {ChipsModule} from "primeng/chips";
import {DialogModule} from "primeng/dialog";
import {getSessionItem} from "@utils/storage-utils";

@Component({
  standalone: true,
  selector: 'app-modalcliente',
  imports: [
    DropdownModule,
    ToolbarModule,
    TableModule,
    ButtonDirective,
    Ripple,
    ChipsModule,
    DialogModule,
  ],
  templateUrl: './modalcliente.component.html',
  styles: ``
})
export class ModalclienteComponent implements OnInit {

  public tipoCliente = input.required<string>();
  private _visible = false;
  @Input() isVisibleDropdown: boolean = false
  @Output() onBtnClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onChangeProv: EventEmitter<string> = new EventEmitter<string>();
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() set visible(val: boolean) {
    this._visible = val;
  }

  get visible(): boolean {
    return this._visible;
  }


  protected loading = false;

  sortTipoCli: SelectItem[] = []
  clientes: Cliente[] = []
  selectedClient!: Cliente

  private selectionService = inject(SelectionService)
  private clienteService = inject(ClienteService)

  protected empresa = 0;

  constructor() {
  }

  ngOnInit() {
    this.sortTipoCli = [
      {label: 'Cliente', value: 1},
      {label: 'Proveedor', value: 2},
      {label: 'Empleado', value: 5},
    ]
    this.empresa = Number(getSessionItem("empresa"));
    this.listarClientes(this.empresa, 2);
  }

  onSortChange(event: any) {
    const tipo = Number(event.value);
    this.listarClientes(this.empresa, tipo)
  }

  listarClientes(empresa: number, tipo: number) {
    this.loading = true;
    this.clienteService.getClienteXTipo(empresa, tipo).subscribe({
      next: data => {
        this.clientes = data
        this.loading = false
      },
      error: err => {
        console.error(err)
        this.clientes = []
        this.loading = false
      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  seleccionarProv(proveedor: Cliente) {
    this.selectionService.actualizarClienteSeleccionado(proveedor.codigo)
    this.onChangeProv.emit(proveedor.nombre)
    this.onBtnClick.emit(false)
    this.visible = false
  }

  close(){
    this.visible = false
    this.visibleChange.emit(false)
  }

}
