import {Routes} from '@angular/router'
import {returnGuard} from "../../core/guards/return.guard";

export const importacionesRoutes: Routes = [
  {
    path: 'carga-solicitud',
    loadComponent: () => import('./procesos/carga-solicitud/carga-solicitud.component'),
    data: {breadcrumb: 'Carga solicitud '},
    canDeactivate: [returnGuard]
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
