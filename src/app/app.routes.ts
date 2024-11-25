import { Routes } from '@angular/router';
import {LayoutComponent} from "@layout/components/layout/layout.component";
import {NotFoundComponent} from "./features/error/not-found/not-found.component";

export const routes: Routes = [
  {
    path: 'assist',
    children: [
      {
        path:'auth',
        loadComponent: () => import('./features/auth/login/login.component')
      },
      {
        path:'forgotpassword',
        loadComponent: () => import('./features/auth/forgotpassword/forgotpassword.component')
      },
      {
        path:'inicio', component: LayoutComponent,
        children:[
        ]
      },
      {path: 'deuna/:id/:empresa', loadComponent: () => import('./features/deuna/deuna.component')},
    ]
  },
  {path: 'notFound', component: NotFoundComponent},
  {path: '', redirectTo: '/assis/auth', pathMatch: "full"},
  {path: '**', redirectTo: 'notFound', pathMatch: 'full'},
];
