import { Routes } from '@angular/router';

export const inventariosRoutes: Routes = [
  {
    path: 'pedido-despachos',
    data: {breadcrumb: 'Pedido Despachos'},
    loadComponent: () => import('@features/inventarios/procesos/pedido-despacho/page/despacho/despacho.component')
  }
];
