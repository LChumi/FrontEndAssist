import {inject, Injectable} from '@angular/core';
import Clarity from "@microsoft/Clarity";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {UserResponse} from "@models/record/user-response";

@Injectable({
  providedIn: 'root'
})
export class ClarityService {

  constructor() { }

  private router = inject(Router);
  private initialized = false;

  init(projectId: string) {
    if (!this.initialized){
      Clarity.init(projectId);
      this.initialized = true;
      this.trackRoutes();
    }
  }

  identify(usrId: any, username: any) {
    Clarity.identify(usrId, undefined,undefined, username);
  }

  setTag(key: string, value: string | null | undefined): void {
    if (value && value.trim() !== '') {
      Clarity.setTag(key, value);
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
      Clarity.event(name);
    }
  }

  private trackRoutes(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        Clarity.event(`route:${event.urlAfterRedirects}`);
      });
  }

}
