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

  private trackRoutes(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        clarity.event(`route:${event.urlAfterRedirects}`);
      });
  }

}
