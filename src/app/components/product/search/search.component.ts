import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isAuthenticated: boolean = false;
  admin: boolean = false;

  constructor(private router: Router,private oktaAuthService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit() {
    // Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        if(this.isAuthenticated){
          this.checkAdmin()
        }
      }
    );

  }

  async checkAdmin(){
    const user = await this.oktaAuth.getUser().then()
    for (let i in user.groups as any) {
      if (user.groups[i] === 'Admin_product_editor') {
        this.admin = true;
      }
      console.log("Admin" + this.admin)
    }
  };

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }
}
