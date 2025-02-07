import {Routes} from "@angular/router";

export const contabilidadRoutes: Routes = [
  {
    path: 'procesos',
    data: {breadcrumb: 'Procesos'},
    children: [
      {
        path: 'carga-documentos',
        loadComponent: () => import('@features/contabilidad/procesos/carga-documentos/carga-documentos.component'),
        data: {breadcrumb: 'Carga Documentos '},
      }
    ]
  },
  {
    path: 'consultas',
    data: {breadcrumb: 'Consultas'},
    children: [
      {
        path: 'monitoreo',
        loadComponent: () => import('@features/contabilidad/consultas/monitoreo/monitoreo.component'),
        data: {breadcrumb: 'Monitoreo'}
      }
    ]
  }
]
