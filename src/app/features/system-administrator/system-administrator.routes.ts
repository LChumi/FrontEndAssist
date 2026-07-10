import {Routes} from "@angular/router";

export const systemAdministratorRoutes:Routes = [
  {
    path: 'menus-sistema',
    data: {breadcrumb: 'Menus Sistema'},
    loadComponent: () => import('@features/system-administrator/mantenimientos/menus-sistema/menus-sistema.component')
  }
];
