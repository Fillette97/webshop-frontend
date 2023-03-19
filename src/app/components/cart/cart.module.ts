import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckoutComponent} from "./checkout/checkout.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CartStatusComponent} from "./cart-status/cart-status.component";
import {CartDetailsComponent} from "./cart-details/cart-details.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [CartDetailsComponent, CartStatusComponent, CheckoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [CartStatusComponent, CartDetailsComponent, CheckoutComponent]
})
export class CartModule {
}
