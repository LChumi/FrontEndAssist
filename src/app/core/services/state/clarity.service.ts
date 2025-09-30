import {inject, Injectable} from '@angular/core';
import clarity from '@microsoft/clarity';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {UserResponse} from "@models/record/user-response";

@Injectable({
  providedIn: 'root'
})
export class ClarityService {

  constructor() { }

  private router = inject(Router);
  initialized = false;

  init(projectId: string) {
    if (!this.initialized){
      clarity.init(projectId);
      this.initialized = true;
      this.trackRoutes();
    }
  }

  identify(usrId: any, username: any) {
    clarity.identify(usrId, undefined,undefined, username);
  }

  setTag(key: string, value: string | null | undefined): void {
    if (value && value.trim() !== '') {
      clarity.setTag(key, value);
    }
  }

  trackUser(user: UserResponse){
    if (user?.id && user?.username) {
      this.identify(user.id, user.username);

      this.setTag('nombre', user.nombre ?? '');
      this.setTag('username', user.username ?? '');
    }
  }

  event(name: string){
    if (name && name.trim() !== '') {
      clarity.event(name);
    }
  }

  prioritize(reason: string): void {
    if (reason && reason.trim() !== '') {
      clarity.upgrade(reason);
    }
  }


  private trackRoutes() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects.toLowerCase().split('?')[0];

      // Normaliza rutas dinámicas
      const normalizedUrl = this.normalizeRoute(currentUrl);

      // Lista de rutas que quieres excluir
      const excludedRoutes = ['deuna', 'jep-faster'];

      const shouldExclude = excludedRoutes.includes(normalizedUrl);

      if (!shouldExclude) {
        clarity.setTag('ruta', normalizedUrl);
        clarity.event('Ruta visitada');
      }
    });
  }

  private normalizeRoute(url: string): string {
    const patterns: { regex: RegExp; tag: string }[] = [
      { regex: /^\/deuna\/\d+\/[^/]+$/, tag: 'deuna' },
      { regex: /^\/jep-faster\/\d+\/[^/]+$/, tag: 'jep-faster' }
    ];

    for (const pattern of patterns) {
      if (pattern.regex.test(url)) {
        return pattern.tag;
      }
    }

    // Si no coincide con ningún patrón, devuelve la ruta original
    return url.replace(/\/\d+(\/[^/]+)?$/, '');
  }

}
