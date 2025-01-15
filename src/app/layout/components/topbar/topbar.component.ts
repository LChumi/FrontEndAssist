import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ChipsModule} from "primeng/chips";
import {ButtonDirective} from "primeng/button";
import {BreadcrumbComponent} from "@layout/components/breadcrumb/breadcrumb.component";
import {LayoutService} from "@layout/service/layout.service";
import {getSessionItem} from "@utils/storage-utils";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ChipsModule,
    ButtonDirective,
  ],
  templateUrl: './topbar.component.html',
  styles: ``
})
export class TopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;

  layoutService = inject(LayoutService)
  empresa: any

  constructor() {
    this.empresa = getSessionItem('nombreEmpresa')
  }

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
