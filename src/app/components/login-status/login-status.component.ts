import {Component, Inject, OnInit} from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;
  editProductButton : boolean = false;


  constructor(private oktaAuthService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {

    // Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    );
  }





  // getUserDetails() {
  //   if (this.isAuthenticated) {
  //
  //     // Fetch the logged in user details (user's claims)
  //     //
  //     // user full name is exposed as a property name
  //     this.oktaAuth.getUser().then(
  //       (res) => {
  //         this.userFullName = res.name;
  //         this.editProductButton = res.groups.find((group) => group === 'Admin_product');
  //       }
  //     );
  //   }
  // }
  getUserDetails() {
    if (this.isAuthenticated) {

      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;
        }
      );
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuth.signOut();
  }

  // getAdminPanel() {
  //   console.log("HEREEEE")
  //   Router.navigate(['/admin-panel']);
  // }
}
