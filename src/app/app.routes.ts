import {Routes} from '@angular/router';
import {LayoutComponent} from "@layout/components/layout/layout.component";
import {NotFoundComponent} from "@features/error/not-found/not-found.component";
import DeunaComponent from "@features/payments/deuna/deuna.component";
import {PrivacyPolicyComponent} from "@features/privacy-policy/privacy-policy.component";
import {importacionesRoutes} from "@features/importacion/importaciones.routes";
import {authRoutes} from "@features/auth/auth.routes";
import {contabilidadRoutes} from "@features/contabilidad/contabilidad.routes";
import {sessionGuard} from "@guards/session.guard";
import {JepFasterComponent} from "@features/payments/jep-faster/jep-faster.component";
import {inventariosRoutes} from "@features/inventarios/inventarios.routes";
import {systemAdministratorRoutes} from "@features/system-administrator/system-administrator.routes";

export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: 'inicio', component: LayoutComponent,
    canActivate: [sessionGuard],
    canActivateChild: [sessionGuard],
    children: [
      {
        path: 'dashboard',
        data: {breadcrumb: 'Inicio Dashboard'},
        loadComponent: () => import('@features/dashboards/dashboard/dashboard.component')
      },
      {
        path: 'system-administrator',
        data: {breadcrumb: 'Administracion Sistema'},
        children: systemAdministratorRoutes
      },
      {
        path: 'importaciones',
        data: {breadcrumb: 'Importacion'},
        children: importacionesRoutes
      },
      {
        path: 'contabilidad',
        data: {breadcrumb: 'Contabilidad'},
        children: contabilidadRoutes
      },
      {
        path: 'inventarios',
        data: {breadcrumb: 'Inventarios'},
        children: inventariosRoutes
      },
      {path: '', redirectTo: 'dashboard', pathMatch: "full"},
      {path: '**', redirectTo: 'dashboard', pathMatch: "full"}
    ]
  },
  {path: 'notFound', component: NotFoundComponent},
  {path: 'deuna/:id/:empresa', component: DeunaComponent},
  {path: 'jep-faster/:id/:empresa', component: JepFasterComponent},
  {path: 'cumpleanos/politica-privacidad', component: PrivacyPolicyComponent},
  {path: '', redirectTo: '/auth', pathMatch: "full"},
  {path: '**', redirectTo: 'notFound', pathMatch: 'full'}
];
