import {Component, ElementRef, ViewChild} from '@angular/core';
import {LayoutService} from "../../service/layout.service";
import {BreadcrumbComponent} from "../breadcrumb/breadcrumb.component";
import {ChipsModule} from "primeng/chips";
import {ButtonDirective} from "primeng/button";

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
