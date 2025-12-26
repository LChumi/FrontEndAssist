import {Routes} from '@angular/router'
import {returnGuard} from "@guards/return.guard";

export const importacionesRoutes: Routes = [
  {
    path: 'procesos',
    data: {breadcrumb: 'Procesos'},
    children : [
      {
        path: 'carga-solicitud',
        loadComponent: () => import('./procesos/carga-solicitud/carga-solicitud.component'),
        data: {breadcrumb: 'Carga solicitud '},
        canDeactivate: [returnGuard],
      },
      {
        path: 'carga-orden-compra',
        loadComponent: () => import('./procesos/carga-orden-compra/carga-orden-compra.component'),
        data: { breadcrumb: 'Carga Orden de compra'},
        canDeactivate: [returnGuard]
      },
      {
        path: 'carga-importacion',
        loadComponent: () => import('./procesos/carga-importacion/carga-importacion.component'),
        data: { breadcrumb: 'Carga Importacion'},
      }
    ]
  },
  {
    path: 'consultas',
    data: {breadcrumb: 'Consultas'},
    children: [
      {
        path: 'documentos',
        loadComponent: () => import('./consultas/consultas-importacion/consultas-importacion.component'),
        data: {breadcrumb: 'Documentos'},
      }
    ]
  },
]
