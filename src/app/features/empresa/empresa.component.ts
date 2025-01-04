import {Component, inject, OnInit} from '@angular/core';
import {Empresa} from "@models/entities/empresa";
import {MenusService} from "@services/api/menus.service";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {ConfigComponent} from "@layout/config/config.component";
import {Router} from "@angular/router";

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
export default class EmpresaComponent implements OnInit{

  menuService= inject(MenusService)
  router = inject(Router)

  listasEmpresa: Empresa[] =[]

  ngOnInit(): void {
    const usrIdString =sessionStorage.getItem('usrid')
    if (usrIdString){
      const usrId = Number(usrIdString)
      this.menuService.getEmpresas(usrId).subscribe(
        empresas => {
          this.listasEmpresa=empresas
        }
      )
    }
  }

  empresaSelected(empresa:Empresa){
    if (empresa){
      sessionStorage.setItem('empresa', String(empresa.id))
      sessionStorage.setItem('nombreEmpresa', empresa.nombre)
      this.goToInicio()
    }
  }

  goToInicio(){
    this.router.navigate(['/assist', 'inicio', 'dashboard'])
  }
}
