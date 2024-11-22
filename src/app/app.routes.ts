import { Routes } from '@angular/router';
import {LayoutComponent} from "@layout/components/layout/layout.component";

export const routes: Routes = [
  {
    path: 'assist',
    children: [
      {
        path:'auth',
        loadComponent: () => import('./features/auth/login/login.component')
      },
      {
        path:'inicio', component: LayoutComponent,
        children:[

        ]
      }
    ]
  }
];
