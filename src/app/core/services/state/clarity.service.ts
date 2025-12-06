import {inject, Injectable} from '@angular/core';
import clarity from '@microsoft/clarity';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {UserResponse} from "@models/record/user-response";

@Injectable({
  providedIn: 'root'
})
export class ClarityService {

  private router = inject(Router);
  private initialized = false;

  // Rutas que NO deben enviar datos a Clarity
  private excludedPatterns: RegExp[] = [
    /^\/deuna\b/,
    /^\/jep-faster\b/,
  ];

  init(projectId: string) {
    if (!this.initialized && typeof window !== 'undefined') {
      clarity.init(projectId);
      this.initialized = true;
      this.trackRoutes();
    }
  }

  /** Excluir rutas */
  private isExcludedRoute(url: string): boolean {
    return this.excludedPatterns.some(pattern => pattern.test(url));
  }

  identify(userId: any, username: string) {
    clarity.identify(userId, undefined, undefined, username);
  }

  setTag(key: string, value?: string) {
    if (value && value.trim() !== '') {
      clarity.setTag(key, value);
    }
  }

  trackUser(user: UserResponse) {
    if (!user) return;

    if (user.id && user.username) {
      this.identify(user.id, user.username);
      this.setTag('nombre', user.nombre ?? '');
      this.setTag('username', user.username ?? '');
    }
  }

  event(name: string) {
    if (name?.trim()) clarity.event(name);
  }

  prioritize(reason: string) {
    if (reason?.trim()) clarity.upgrade(reason);
  }

  /** Tracking de rutas con exclusión */
  private trackRoutes() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      const currentUrl = event.urlAfterRedirects.toLowerCase().split('?')[0];

      // No registrar esta ruta
      if (this.isExcludedRoute(currentUrl)) {
        // Opcional: logueo para debug
        console.log(`Clarity: ruta excluida → ${currentUrl}`);
        return;
      }

      // Normalización opcional
      const normalized = this.normalizeRoute(currentUrl);

      clarity.setTag('ruta', normalized);
      clarity.event(`Ruta visitada: ${normalized}`);
    });
  }

  /** Normalizar rutas dinámicas */
  private normalizeRoute(url: string): string {
    const patterns: { regex: RegExp; tag: string }[] = [
      { regex: /^\/deuna\/\d+\/[^/]+$/, tag: 'deuna' },
      { regex: /^\/jep-faster\/\d+\/[^/]+$/, tag: 'jep-faster' }
    ];

    for (const p of patterns) {
      if (p.regex.test(url)) return p.tag;
    }

    return url.replace(/\/\d+(\/[^/]+)?$/, '');
  }
}
