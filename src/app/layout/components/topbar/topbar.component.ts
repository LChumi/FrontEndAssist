import {Component, ElementRef, ViewChild} from '@angular/core';
import {ChipsModule} from "primeng/chips";
import {ButtonDirective} from "primeng/button";
import {BreadcrumbComponent} from "@layout/components/breadcrumb/breadcrumb.component";
import {LayoutService} from "@layout/service/layout.service";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ChipsModule,
    ButtonDirective
  ],
  templateUrl: './topbar.component.html',
  styles: ``
})
export class TopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;

  constructor(public layoutService: LayoutService) { }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.layoutService.showProfileSidebar();
  }
  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }

}
