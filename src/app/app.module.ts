import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';

import {Routes, RouterModule, Router} from '@angular/router';
import {ProductCategoryMenuComponent} from './components/product-category-menu/product-category-menu.component';
import {SearchComponent} from './components/search/search.component';


// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CartStatusComponent} from './components/cart-status/cart-status.component';
import {CartDetailsComponent} from './components/cart-details/cart-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {LoginStatusComponent} from './components/login-status/login-status.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "./components/login/login.component";
// import{DataTableModule} from "angular-datatable";
import {MatTableModule} from '@angular/material/table'

import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
// import {AdminGuard} from "./admin/admin.guard";
import {AddProductComponent} from "./components/add-product/add-product.component";
import {MatIconModule} from "@angular/material/icon";
import {ProductEditComponent} from './components/product-edit/product-edit.component';


import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, OktaAuthGuard
} from '@okta/okta-angular';

import {OktaAuth} from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

import {AdminGuard} from "./admin/admin.guard";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import { OrderHistoryComponent } from './components/order-history/order-history.component';
// import {AuthInterceptorService} from "./services/auth-interceptor.service";
function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available within your application
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard],
    data: {onAuthRequired: sendToLoginPage} },
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'product-edit/:id', canActivate: [OktaAuthGuard, AdminGuard], component: ProductEditComponent},
  {path: 'login', component: LoginComponent},
  {path:'add-product', canActivate: [OktaAuthGuard, AdminGuard], component: AddProductComponent},
  {path: 'admin-panel', canActivate: [OktaAuthGuard, AdminGuard], component: AdminPanelComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    AdminPanelComponent,
    AddProductComponent,
    ProductEditComponent,
    OrderHistoryComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    // NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [ProductService, {provide: OKTA_CONFIG, useValue: {oktaAuth}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
