import {Component, inject} from '@angular/core';
import {RolMenuService} from "@services/api/assist/rol-menu.service";
import {MessageService, PrimeTemplate} from "primeng/api";
import {RolMenu} from "@models/entities/rol-menu";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {MenuWService} from "@services/api/assist/menu-w.service";
import {RolWService} from "@services/api/assist/rol-w.service";
import {RolW} from "@models/entities/rol-w";
import {MenuW} from "@models/entities/menu-w";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-rol-menu-asignacion',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    FormsModule,
    InputTextModule,
    PrimeTemplate,
    TableModule,
    TagModule,
    DropdownModule
  ],
  templateUrl: './rol-menu-asignacion.component.html',
  styles: ``
})
export class RolMenuAsignacionComponent {

  private service = inject(RolMenuService);
  private rolService = inject(RolWService);
  private menuService = inject(MenuWService);
  private messageService = inject(MessageService);

  relaciones: RolMenu[] = [];
  roles: RolW[] = [];
  menus: MenuW[] = [];
  dialogVisible = false;
  isEditMode = false;
  form: Partial<RolMenu> = {};

  ngOnInit() {
    this.getAll();
    this.rolService.getAll().subscribe({next: data => this.roles = data});
    this.menuService.getAll().subscribe({next: data => this.menus = data});
  }

  getAll() {
    this.service.getAll().subscribe({next: data => this.relaciones = data});
  }

  openNew() {
    this.isEditMode = false;
    this.form = {};
    this.dialogVisible = true;
  }

  openEdit(rel: RolMenu) {
    this.isEditMode = true;
    this.form = {...rel};
    this.dialogVisible = true;
  }

  save() {
    if (!this.form.rolW || !this.form.menuW) {
      this.messageService.add({severity: 'warn', summary: 'Atención', detail: 'Selecciona rol y menú'});
      return;
    }
    const payload = this.form as RolMenu;
    const request$ = this.isEditMode ? this.service.update(payload) : this.service.create(payload);
    request$.subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Guardado correctamente'});
        this.dialogVisible = false;
        this.getAll();
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message ?? 'No se pudo guardar'
        });
      }
    });
  }
}
