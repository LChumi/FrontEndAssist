import {Component, inject, OnInit} from '@angular/core';
import {MenuitemComponent} from "@layout/components/menu-item/menuitem.component";
import {MenusService} from "@services/api/menus.service";
import {getSessionItem} from "@utils/storage-utils";

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

  private menuService = inject(MenusService)

  protected model: any[] = [];

  ngOnInit() {
    const usrIdStr = getSessionItem('usrId')
    const empresaStr = getSessionItem('empresa')
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
