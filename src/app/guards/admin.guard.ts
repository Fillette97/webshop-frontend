import {Inject, Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {OktaAuth} from '@okta/okta-auth-js';
import {OKTA_AUTH} from "@okta/okta-angular";


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = await this.oktaAuth.getUser();
    console.log(user)
    for (let i in user.groups as any) {
      if (user.groups[i] === 'Admin_product_editor') {
        return true
      }
    }
    alert('User is not authorized to perform this operation');
    return false;
  }

}
