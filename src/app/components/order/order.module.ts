import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [OrderHistoryComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [OrderHistoryComponent]
})
export class OrderModule { }
