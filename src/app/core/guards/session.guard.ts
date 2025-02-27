import {CanActivateFn, Router} from '@angular/router';
import {getSessionItem} from "@utils/storage-utils";
import {inject} from "@angular/core";

export const sessionGuard: CanActivateFn = (route, state) => {

  const usrLogged = getSessionItem("usrId");
  const empresa = getSessionItem("empresa");
  const router = inject(Router)

  if (usrLogged && empresa) {
    return true;
  } else if (usrLogged && !empresa) {
    router.navigate(['/assist', 'auth', 'empresas']).then(r => {});
    return false;
  } else {
    router.navigate(['/assist', 'auth', 'login']).then(r => {});
    return false;
  }
};
