import {Component, inject, OnInit} from '@angular/core';
import {ProgramaWService} from "@services/api/assist/programa-w.service";
import {MessageService} from "primeng/api";
import {ProgramaW} from "@models/entities/programa-w";
import {Button} from "primeng/button";
import {TagModule} from "primeng/tag";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-programa',
  standalone: true,
  imports: [
    Button,
    TagModule,
    TableModule,
    DialogModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './programa.component.html',
  styles: ``
})
export class ProgramaComponent implements OnInit {

  private service = inject(ProgramaWService);
  private messageService = inject(MessageService);

  programas: ProgramaW[] = []
  dialogVisible = false;
  isEditMode = false;
  form: Partial<ProgramaW> = {};

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe({next: data => this.programas = data});
  }

  openNew() {
    this.isEditMode = false;
    this.form = {inactivo: false};
    this.dialogVisible = true;
  }

  openEdit(prog: ProgramaW) {
    this.isEditMode = true;
    this.form = {...prog};
    this.dialogVisible = true;
  }

  save() {
    if (this.form && this.form.nombre && this.form.prwId && this.form.path){
      const payload  :ProgramaW ={
        ... (this.isEditMode ? {id: this.form.id} : {}),
        nombre: this.form.nombre.toUpperCase(),
        prwId: this.form.prwId.toUpperCase(),
        path: this.form.path.toLowerCase(),
        inactivo: false,
      }
      const request$ = this.isEditMode ? this.service.update(payload) : this.service.create(payload);
      request$.subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Guardado correctamente'});
          this.dialogVisible = false;
          this.getAll();
        }
      });
    } else {
      this.messageService.add({severity: 'warn', summary: 'Formulario Incompleto', detail: 'Ingrese los datos'})
      return
    }
  }

  toggleInactivo(prog: ProgramaW) {
    this.service.update({...prog, inactivo: !prog.inactivo}).subscribe({next: () => this.getAll()});
  }
}
