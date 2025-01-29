import {Component, inject} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {BadgeModule} from "primeng/badge";
import {LayoutService} from "@layout/service/layout.service";
import {Router} from "@angular/router";
import {clearSessionItems, getSessionItem} from "@utils/index"

@Component({
  selector: 'app-profilemenu',
  standalone: true,
  imports: [
    SidebarModule,
    BadgeModule
  ],
  templateUrl: './profile-sidebar.component.html'
})
export class ProfileSidebarComponent {

  nombre: any;
  username: any;
  private layoutService = inject(LayoutService)
  private router = inject(Router);

  constructor() {
    this.nombre = getSessionItem('nombre');
    this.username = getSessionItem('username');
  }

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }

  signOut(): void {
    clearSessionItems();
    this.visible = false;
    this.router.navigate(['/assist', 'auth', 'login']);
  }
}
