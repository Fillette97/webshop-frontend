// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
//
// import { OktaAuth } from '@okta/okta-auth-js';
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AdminGuard implements CanActivate {
//
//   constructor(private oktaAuth: OktaAuth) {
//   }
//
//   result: any;
//
//
//
//   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//
//     const user =  await this.oktaAuth.getUser();
//     const result = user.groups.find((group) => group === 'Admin_product');
//     if (result) {
//       return true;
//     } else {
//       alert('User is not authorized to perform this operation');
//       return false; }
//   }
//
//
//
//
// }
