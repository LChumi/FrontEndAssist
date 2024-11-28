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

  usrId: number | null = 0

  model: any[] = [];

  constructor() {
    this.convertirStringNumber()
  }

  ngOnInit() {
    this.convertirStringNumber()
    if (this.usrId){
      this.menuService.getMenus(this.usrId,2).subscribe(
        menus => {
          console.log(menus)
          this.model = menus;
        }
      )
    }
  }

  convertirStringNumber(){
    const id=sessionStorage.getItem('usrid')
    if (id){
      this.usrId= parseInt(id)
    }
  }
}
