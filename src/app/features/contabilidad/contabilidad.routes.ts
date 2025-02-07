import {Routes} from "@angular/router";

export const contabilidadRoutes: Routes = [
  {
    path: 'carga-documentos',
    loadComponent: () => import('@features/contabilidad/procesos/carga-documentos/carga-documentos.component'),
    data: {breadcrumb: 'Carga Documentos '},
  }
]
