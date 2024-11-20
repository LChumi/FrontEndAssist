import {Component, inject, OnInit} from '@angular/core';
import {MenuitemComponent} from "@layout/components/menu-item/menuitem.component";
import {MenusService} from "@services/menus.service";

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

  model: any[] = [];

  ngOnInit() {
    console.log("ingreso a menus")
    this.menuService.getMenus(1,2).subscribe(
      menus => {
        console.log(menus)
        this.model = menus;
      }
    )
  }
}
