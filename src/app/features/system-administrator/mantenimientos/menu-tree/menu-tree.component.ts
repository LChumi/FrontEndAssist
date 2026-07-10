import {Component, inject, OnInit} from '@angular/core';
import {ConfirmationService, MessageService, TreeNode} from "primeng/api";
import {MenuW} from "@models/entities/menu-w";
import {MenuWService} from "@services/api/assist/menu-w.service";
import {TreeModule} from "primeng/tree";
import {ProgramaWService} from "@services/api/assist/programa-w.service";
import {ProgramaW} from "@models/entities/programa-w";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ToggleButtonModule} from "primeng/togglebutton";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-menu-tree',
  standalone: true,
  imports: [
    TreeModule,
    InputNumberModule,
    DropdownModule,
    FormsModule,
    ToggleButtonModule,
    Button,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule
  ],
  templateUrl: './menu-tree.component.html',
  styles: ``
})
export class MenuTreeComponent implements OnInit{

  private menuService = inject(MenuWService);
  private programaService = inject(ProgramaWService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  treeData: TreeNode[] = [];
  flatMenus: MenuW[] = [];
  programas: ProgramaW[] = [];

  dialogVisible = false;
  isEditMode = false;
  esMenuItem = false;

  menuForm: Partial<MenuW> = {};

  ngOnInit() {
    this.getMenus()
    this.getProgramas();
  }

  get opcionesPadre(): MenuW[] {
    if (!this.isEditMode) return this.flatMenus;
    return this.flatMenus.filter(m => m.id !== this.menuForm.id);
  }

  getMenus(){
    this.menuService.getAll().subscribe({
      next: data => {
        this.flatMenus = data;
        this.treeData = this.buildMenuTree(data);
      }
    })
  }

  getProgramas() {
    this.programaService.getAll().subscribe({
      next: data => this.programas = data.filter(p => !p.inactivo)
    });
  }

  openNew() {
    this.isEditMode = false;
    this.esMenuItem = false;
    this.menuForm = {
      inactivo: false,
      orden: 0
    };
    this.dialogVisible = true;
  }

  openEdit(node: TreeNode) {
    const menu: MenuW = node.data.raw;
    this.isEditMode = true;
    this.esMenuItem = !!menu.programa;
    this.menuForm = { ...menu, reporta: menu.reporta };
    console.log('menuForm.reporta:', this.menuForm.reporta, typeof this.menuForm.reporta);
    console.log('flatMenus ids:', this.flatMenus.map(m => m.id));
    this.dialogVisible = true;
  }

  onNodeSelect(event: any) {
    const node: TreeNode = event.node;
    if (node.data.isMenuItem) {
      console.log('Ruta asociada:', node.data.path);
    }
  }

  buildMenuTree(menus: MenuW[]): TreeNode[] {
    // 1. Mapa id -> nodo (sin hijos todavía)
    const nodeMap = new Map<number, TreeNode>();

    menus.forEach(m => {
      const isMenuItem = !!m.programa?.path; // clave: solo si tiene programa CON path

      nodeMap.set(m.id, {
        key: String(m.id),
        label: m.nombre,
        icon: m.icono,
        data: {
          mnwId: m.mnwId,
          path: m.programa?.path ?? null,
          isMenuItem,
          raw: m
        },
        leaf: isMenuItem,        // si es menuitem, no debería tener hijos (opcional forzarlo)
        children: [],
        selectable: isMenuItem   // solo los que navegan son "seleccionables"
      });
    });

    // 2. Enlazar hijos a padres usando "reporta"
    const roots: TreeNode[] = [];

    menus
      .sort((a, b) => a.orden - b.orden) // respeta MNW_ORDEN
      .forEach(m => {
        const node = nodeMap.get(m.id)!;
        if (m.reporta === null || m.reporta === undefined) {
          roots.push(node);
        } else {
          const parent = nodeMap.get(m.reporta);
          if (parent) {
            parent.children!.push(node);
          } else {
            // padre no encontrado (huérfano) -> lo tratamos como raíz
            roots.push(node);
          }
        }
      });

    // 3. Ordenar children también por orden (por si el push no respetó el orden global)
    const sortChildren = (nodes: TreeNode[]) => {
      nodes.sort((a, b) => (a.data.raw.orden ?? 0) - (b.data.raw.orden ?? 0));
      nodes.forEach(n => n.children?.length && sortChildren(n.children));
    };
    sortChildren(roots);

    return roots;
  }

  save() {
    // si NO es menuitem, forzamos programa = null (es cabecera)
    if (!this.esMenuItem) {
      this.menuForm.programa = null;
    }

    const payload = this.menuForm as MenuW;
    const request$ = this.isEditMode
      ? this.menuService.update(payload)
      : this.menuService.create(payload);

    request$.subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: this.isEditMode ? 'Menú actualizado' : 'Menú creado' });
        this.dialogVisible = false;
        this.getMenus();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message ?? 'No se pudo guardar' });
      }
    });
  }

  confirmDelete(node: TreeNode) {
    const menu: MenuW = node.data.raw;
    if (node.children && node.children.length > 0) {
      this.messageService.add({ severity: 'warn', summary: 'No permitido', detail: 'Este menú tiene submenús. Elimínalos primero.' });
      return;
    }
    this.confirmationService.confirm({
      message: `¿Inactivar el menú "${menu.nombre}"?`,
      key: 'menu',
      header: 'Confirmar',
      accept: () => {
        this.menuService.update({ ...menu, inactivo: true }).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Menú inactivado' });
            this.getMenus();
          }
        });
      }
    });
  }
}
