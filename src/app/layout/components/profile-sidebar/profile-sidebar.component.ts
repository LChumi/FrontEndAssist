import { Component } from '@angular/core';
import {LayoutService} from "../../service/layout.service";
import {SidebarModule} from "primeng/sidebar";
import {BadgeModule} from "primeng/badge";

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
