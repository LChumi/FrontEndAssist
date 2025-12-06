import {Component, inject, OnInit} from '@angular/core';
import {Empresa} from "@models/entities/empresa";
import {AccesoService} from "@services/api/assist/menus.service";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {ConfigComponent} from "@layout/config/config.component";
import {Router} from "@angular/router";
import {getSessionItem, setSessionItem} from "@utils/index";
import {ClarityService} from "@services/state/clarity.service";
import {SeoHelperService} from "@services/state/seo-helper.service";

@Component({
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    ConfigComponent
  ],
  templateUrl: './empresa.component.html',
  styles: ``
})
export default class EmpresaComponent implements OnInit {

  private menuService = inject(AccesoService)
  private router = inject(Router)
  private clarityService = inject(ClarityService)
  private seoHelper = inject(SeoHelperService)

  listasEmpresa: Empresa[] = []

  ngOnInit(): void {
    this.seoHelper.setupPageSeo({
      title: 'Seleccion Empresa | Assist Web',
      description: 'Lista de empresas asignadas al usuario en el sistema assist',
      schemaTitle: 'ContentPage'
    });

    const usrIdString = getSessionItem('usrId')
    if (usrIdString) {
      const usrId = Number(usrIdString)
      this.menuService.getEmpresas(usrId).subscribe(
        empresas => {
          this.listasEmpresa = empresas
        }
      )
    }
  }

  empresaSelected(empresa: Empresa) {
    if (empresa) {
      setSessionItem('empresa', String(empresa.id))
      setSessionItem('nombreEmpresa', empresa.nombre)
      this.clarityService.setTag('nombreEmpresa', empresa.nombre)
      this.clarityService.setTag('empresa',String(empresa.id))
      this.clarityService.event('Seleccion Empresa');
      this.goToInicio()
    }
  }

  goToInicio() {
    this.router.navigate(['/inicio', 'dashboard']).then(r => {})
  }
}
