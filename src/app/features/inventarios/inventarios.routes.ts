import {Routes} from '@angular/router';

export const inventariosRoutes: Routes = [
  {
    path: 'pedido-despachos',
    data: {breadcrumb: 'Pedido Despachos'},
    title: 'Gestion Pedidos | Assist Web',
    loadComponent: () => import('@features/inventarios/procesos/pedido-despacho/page/despacho/despacho.component')
  }
];
