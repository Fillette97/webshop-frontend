import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginStatusComponent} from "./login-status/login-status.component";
import {LoginComponent} from "./login.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [LoginStatusComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LoginStatusComponent, LoginComponent]
})
export class LoginModule { }
