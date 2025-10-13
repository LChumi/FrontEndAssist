import {CanActivateFn, Router} from '@angular/router';
import {getSessionItem} from "@utils/storage-utils";
import {inject} from "@angular/core";
import {ClarityService} from "@services/state/clarity.service";

export const sessionGuard: CanActivateFn = (route, state) => {

  const usrLogged = getSessionItem("usrId");
  const empresa = getSessionItem("empresa");
  const nombre = getSessionItem("nombre");
  const username = getSessionItem("username");
  const router = inject(Router)
  const clarity = inject(ClarityService);

  if (usrLogged && empresa) {
    clarity.identify(usrLogged, username);
    clarity.setTag('nombre', nombre);
    clarity.setTag('username', username);
    clarity.setTag('empresa', empresa);
    return true;
  } else if (usrLogged && !empresa) {
    router.navigate(['/auth', 'empresas']).then(r => {});
    return false;
  } else {
    router.navigate(['/auth', 'login']).then(r => {});
    return false;
  }
};
