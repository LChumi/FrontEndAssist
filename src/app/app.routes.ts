import { Routes } from '@angular/router';
import {LayoutComponent} from "@layout/components/layout/layout.component";
import {NotFoundComponent} from "@features/error/not-found/not-found.component";
import DeunaComponent from "@features/deuna/deuna.component";

export const routes: Routes = [
  {
    path: 'assist',
    children: [
      {
        path:'auth',
        children:[
          {
            path:'login',
            loadComponent: () => import('./features/auth/login/login.component')
          },
          {
            path:'forgotpassword',
            loadComponent: () => import('./features/auth/forgotpassword/forgotpassword.component')
          },
          {
            path:'empresas',
            loadComponent: () => import('./features/empresa/empresa.component')
          },
          {path: '', redirectTo: 'login', pathMatch: "full"}
        ]
      },
      {
        path:'inicio', component: LayoutComponent,
        children:[
          {
            path: 'dashboard',
            data: {breadcrumb: 'Inicio Dashboard'},
            loadComponent: () => import('./features/dashboards/dashboard/dashboard.component')
          },
          {path: 'importaciones',
            data: {breadcrumb: 'Importacion'},
            children:[
              {
                path:'carga-solicitud',
                loadComponent: () => import('./features/importacion/procesos/carga-solicitud/carga-solicitud.component'),
                data: {breadcrumb: 'Carga solicitud '}
              },
            ]
          },
          {path: 'contabilidad',
            data: {breadcrumb: 'Contabilidad'},
            children:[
              {
                path: 'carga-documentos',
                loadComponent: () => import('./features/contabilidad/procesos/carga-documentos/carga-documentos.component'),
                data: {breadcrumb: 'Carga Documentos '},
              }
            ]
          },
          {path: '', redirectTo: 'dashboard', pathMatch: "full"}
        ]
      },
    ]
  },
  {path: 'notFound', component: NotFoundComponent},
  {path:'deuna/:id/:empresa', component: DeunaComponent},
  {path: '', redirectTo: '/assist/auth', pathMatch: "full"},
  {path: '**', redirectTo: 'notFound', pathMatch: 'full'}
];
