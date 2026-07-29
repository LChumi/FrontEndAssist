import {CanActivateFn, Router} from '@angular/router';
import {getSessionItem} from "@utils/storage-utils";
import {inject} from "@angular/core";

export const sessionGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);

  const usrLogged = getSessionItem('usrId');
  const empresa = getSessionItem('empresa');
  const nombre = getSessionItem('nombre');
  const username = getSessionItem('username');

  // Usuario autenticado y empresa seleccionada
  if (usrLogged && empresa && nombre && username) {
    return true;
  }

  // Usuario autenticado pero falta seleccionar empresa
  if (usrLogged && !empresa && nombre && username) {
    return router.createUrlTree(['/auth', 'empresas']);
  }

  // Cualquier otro caso -> Login
  return router.createUrlTree(['/auth', 'login']);
};
