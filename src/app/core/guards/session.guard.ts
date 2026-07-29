import {CanActivateFn, Router} from '@angular/router';
import {getSessionItem} from "@utils/storage-utils";
import {inject} from "@angular/core";

export const sessionGuard: CanActivateFn = (_route, _state) => {

  const usrLogged = getSessionItem("usrId");
  const empresa = getSessionItem("empresa");
  const nombre = getSessionItem("nombre");
  const username = getSessionItem("username");
  const router = inject(Router)

  if (usrLogged && empresa && username && nombre) {
    return true;
  } else if (usrLogged && !empresa) {
    router.navigate(['/auth', 'empresas']).then(() => {
    });
    return false;
  } else {
    router.navigate(['/auth', 'login']).then(() => {
    });
    return false;
  }
};
