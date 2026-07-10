import { Component } from '@angular/core';
import {TabViewModule} from "primeng/tabview";
import {MenuTreeComponent} from "@features/system-administrator/mantenimientos/menu-tree/menu-tree.component";
import {ProgramaComponent} from "@features/system-administrator/mantenimientos/programa/programa.component";
import {RolComponent} from "@features/system-administrator/mantenimientos/rol/rol.component";
import {
  RolMenuAsignacionComponent
} from "@features/system-administrator/mantenimientos/rol-menu-asignacion/rol-menu-asignacion.component";

@Component({
  selector: 'app-menus-sistema',
  standalone: true,
  imports: [
    TabViewModule,
    MenuTreeComponent,
    ProgramaComponent,
    RolComponent,
    RolMenuAsignacionComponent
  ],
  templateUrl: './menus-sistema.component.html',
  styles: ``
})
export default class MenusSistemaComponent {

}
