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

export const routes: Routes = [
  {
    path: 'assist',
    children: [
      {
        path: 'auth',
        children: authRoutes
      },
      {
        path: 'inicio', component: LayoutComponent,
        canActivate:[sessionGuard],
        canActivateChild:[sessionGuard],
        children: [
          {
            path: 'dashboard',
            data: {breadcrumb: 'Inicio Dashboard'},
            loadComponent: () => import('@features/dashboards/dashboard/dashboard.component')
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
          {path: '', redirectTo: 'dashboard', pathMatch: "full"}
        ]
      },
    ]
  },
  {path: 'notFound', component: NotFoundComponent},
  {path: 'deuna/:id/:empresa', component: DeunaComponent},
  {path: 'jep-faster/:id/:empresa', component: JepFasterComponent},
  {path: 'cumpleanos/politica-privacidad', component: PrivacyPolicyComponent},
  {path: '', redirectTo: '/assist/auth', pathMatch: "full"},
  {path: '**', redirectTo: 'notFound', pathMatch: 'full'}
];
