import { Injectable } from '@angular/core';
import {getSessionItem} from "@utils/storage-utils";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getEmpresa(): number | null {
    const empresa = getSessionItem('empresa');
    return empresa ? Number(empresa) : null;
  }

  getUsuarioId(): number | null {
    const usrId = getSessionItem('usrId');
    return usrId ? Number(usrId) : null;
  }

  getSessionContext(): { idEmpresa: number | null; usrId: number | null } {
    return {
      idEmpresa: this.getEmpresa(),
      usrId: this.getUsuarioId()
    };
  }
}
