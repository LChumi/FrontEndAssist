import {Component, inject} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {BadgeModule} from "primeng/badge";
import {LayoutService} from "@layout/service/layout.service";
import {Router} from "@angular/router";

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
  layoutService = inject(LayoutService)
  router = inject(Router);

  constructor() {
    this.nombre = sessionStorage.getItem('nombre');
  }

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }

  signOut(): void {
    sessionStorage.clear();
    this.visible = false;
    this.router.navigate(['/assist','auth' , 'login']);
  }
}
