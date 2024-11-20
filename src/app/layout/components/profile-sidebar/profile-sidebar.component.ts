import { Component } from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {BadgeModule} from "primeng/badge";
import {LayoutService} from "@layout/service/layout.service";

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

  constructor(public layoutService: LayoutService) { }

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }
}
