import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartDetailsComponent} from "./cart-details/cart-details.component";
import {CartStatusComponent} from "./cart-status/cart-status.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [CartDetailsComponent, CartStatusComponent, CheckoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CartStatusComponent,CartDetailsComponent,CheckoutComponent]
})
export class CartModule {
}
