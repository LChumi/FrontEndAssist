import {Routes} from "@angular/router";

export const contabilidadRoutes: Routes = [
  {
    path: 'procesos',
    data: {breadcrumb: 'Procesos'},
    children: [
      {
        path: 'carga-documentos',
        loadComponent: () => import('@features/contabilidad/procesos/carga-documentos/carga-documentos.component'),
        title: 'Carga de documentos Sri | Assist Web',
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
        title: 'Pagina de consultas monitoreo | Assist web',
        data: {breadcrumb: 'Monitoreo'}
      }
    ]
  }
]
