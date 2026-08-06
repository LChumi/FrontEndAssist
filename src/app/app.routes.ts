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
import {HomeComponent} from "@features/home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Pagina Inicio | Assist Web'},
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
        title: 'Dashboard Inicio | Assist Web',
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
  {path: 'notFound', component: NotFoundComponent, title: 'Pagina no Encontrada | Assist Web'},
  {path: 'deuna/:id/:empresa', component: DeunaComponent, title: 'Pagos DeUna! | Assist Web'},
  {path: 'jep-faster/:id/:empresa', component: JepFasterComponent, title: 'JEPFaster | Assist Web'},
  {
    path: 'cumpleanos/politica-privacidad',
    component: PrivacyPolicyComponent,
    title: 'Politica de privacidad | Assist Web'
  },
  {path: '**', redirectTo: 'notFound', pathMatch: 'full'}
];
