import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductListComponent} from "./product-list/product-list.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {ProductCategoryMenuComponent} from "./product-category-menu/product-category-menu.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {SearchComponent} from "./search/search.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [AddProductComponent, ProductCategoryMenuComponent, ProductEditComponent, ProductListComponent, SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [SearchComponent, ProductCategoryMenuComponent]
})
export class ProductModule { }
