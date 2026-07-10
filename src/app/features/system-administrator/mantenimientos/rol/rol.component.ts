import {Component, inject, OnInit} from '@angular/core';
import {RolWService} from "@services/api/assist/rol-w.service";
import {MessageService, PrimeTemplate} from "primeng/api";
import {RolW} from "@models/entities/rol-w";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    FormsModule,
    InputTextModule,
    PrimeTemplate,
    TableModule,
    TagModule
  ],
  templateUrl: './rol.component.html',
  styles: ``
})
export class RolComponent implements OnInit {

  private service = inject(RolWService);
  private messageService = inject(MessageService);

  roles: RolW[] = [];
  dialogVisible = false;
  isEditMode = false;
  form: Partial<RolW> = {};

  ngOnInit() { this.getAll(); }

  getAll() {
    this.service.getAll().subscribe({ next: data => this.roles = data });
  }

  openNew() {
    this.isEditMode = false;
    this.form = {};
    this.dialogVisible = true;
  }

  openEdit(rol: RolW) {
    this.isEditMode = true;
    this.form = { ...rol };
    this.dialogVisible = true;
  }

  save() {
    const payload = this.form as RolW;
    const request$ = this.isEditMode ? this.service.update(payload) : this.service.create(payload);
    request$.subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Guardado correctamente' });
        this.dialogVisible = false;
        this.getAll();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message ?? 'No se pudo guardar' });
      }
    });
  }
}
