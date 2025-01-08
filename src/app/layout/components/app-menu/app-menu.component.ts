import {Component, inject, OnInit} from '@angular/core';
import {MenuitemComponent} from "@layout/components/menu-item/menuitem.component";
import {MenusService} from "@services/api/menus.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuitemComponent
  ],
  templateUrl: './app-menu.component.html',
  styles: ``
})
export class AppMenuComponent implements OnInit {

  menuService = inject(MenusService)

  usrId: number | null = 0
  empresaId: number | null = 0

  model: any[] = [];

  ngOnInit() {
    const usrIdStr = sessionStorage.getItem('usrid')
    const empresaStr = sessionStorage.getItem('empresa')
    if (usrIdStr && empresaStr) {
      const usrId = Number(usrIdStr)
      const empresa = Number(empresaStr)
      this.menuService.getMenus(usrId, empresa).subscribe(
        menus => {
          this.model = menus
        }
      )
    }
  }

}
