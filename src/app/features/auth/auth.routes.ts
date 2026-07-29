import {Routes} from "@angular/router";

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@features/auth/login/login.component'),
    title: 'Pagina de Autorizacion | Assist Web'
  },
  {
    path: 'forgotpassword',
    loadComponent: () => import('@features/auth/forgotpassword/forgotpassword.component'),
    title: 'Recuperacion de clave | Assist Web'
  },
  {
    path: 'empresas',
    loadComponent: () => import('@features/auth/empresa/empresa.component'),
    title: 'Seleccion Empresa | Assist Web'
  },
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: '**', redirectTo: 'login', pathMatch: "full"}
]
