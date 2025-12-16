import {inject, Injectable} from '@angular/core';
import clarity from '@microsoft/clarity';
import {NavigationEnd, Router} from "@angular/router";
import {filter, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClarityService {

  private router = inject(Router);
  private initialized = false;

  // rutas que NO deben enviar datos
  private excludedPatterns: RegExp[] = [
    /^\/deuna(\/.*)?$/,
    /^\/jep-faster(\/.*)?$/,
  ];

  init(projectId: string) {
    if (this.initialized || typeof window === 'undefined') return;

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        take(1),
      )
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.toLowerCase().split('?')[0];

        if (this.isExcludedRoute(url)) {
          console.warn(`${url} is excluded route`);
          return;
        }

        clarity.init(projectId);
        this.initialized = true;
        this.trackRoutes();
      });
  }

  private isExcludedRoute(url: string): boolean {
    return this.excludedPatterns.some(p => p.test(url));
  }

  identify(userId: any, username: string) {
    clarity.identify(userId, undefined, undefined, username);
  }

  setTag(key: string, value?: string) {
    if (value?.trim()) clarity.setTag(key, value);
  }

  event(name: string) {
    if (name?.trim()) clarity.event(name);
  }

  prioritize(reason: string) {
    if (reason?.trim()) clarity.upgrade(reason);
  }

  private trackRoutes() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        const url = event.urlAfterRedirects.toLowerCase().split('?')[0];

        if (this.isExcludedRoute(url)) {
          return;
        }

        clarity.setTag('ruta', this.normalizeRoute(url));
      });
  }

  private normalizeRoute(url: string): string {
    if (/^\/deuna\/\d+/.test(url)) return 'deuna';
    if (/^\/jep-faster\/\d+/.test(url)) return 'jep-faster';

    return url.replace(/\/\d+(\/[^/]+)?$/, '');
  }
}
