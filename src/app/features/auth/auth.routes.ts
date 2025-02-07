import {Routes} from "@angular/router";

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@features/auth/login/login.component')
  },
  {
    path: 'forgotpassword',
    loadComponent: () => import('@features/auth/forgotpassword/forgotpassword.component')
  },
  {
    path: 'empresas',
    loadComponent: () => import('@features/auth/empresa/empresa.component')
  },
  {path: '', redirectTo: 'login', pathMatch: "full"}
]
