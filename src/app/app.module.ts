import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product/product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {Routes, RouterModule, Router} from '@angular/router';
import {CartDetailsComponent} from './components/cart/cart-details/cart-details.component';
import {CheckoutComponent} from './components/cart/checkout/checkout.component';
import {LoginComponent} from "./components/login/login.component";
import {MatTableModule} from '@angular/material/table'
import {AdminPanelComponent} from './components/admin/admin-panel/admin-panel.component';
import {AddProductComponent} from "./components/product/add-product/add-product.component";
import {MatIconModule} from "@angular/material/icon";
import {ProductEditComponent} from './components/product/product-edit/product-edit.component';


import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, OktaAuthGuard
} from '@okta/okta-angular';

import {OktaAuth} from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

import {AdminGuard} from "./guards/admin.guard";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import {OrderHistoryComponent} from './components/order/order-history/order-history.component';
import {ProductModule} from "./components/product/product.module";
import {CartModule} from "./components/cart/cart.module";
import {AdminModule} from "./components/admin/admin.module";
import {LoginModule} from "./components/login/login.module";
import {OrderModule} from "./components/order/order.module";

// import {AuthInterceptorService} from "./services/auth-interceptor.service";
function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available within your application
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  {
    path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard],
    data: {onAuthRequired: sendToLoginPage}
  },
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'product-edit/:id', canActivate: [OktaAuthGuard, AdminGuard], component: ProductEditComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-product', canActivate: [OktaAuthGuard, AdminGuard], component: AddProductComponent},
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
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    OktaAuthModule,
    MatTableModule,
    MatIconModule,
    ProductModule,
    AdminModule,
    LoginModule,
    OrderModule,
    CartModule

  ],
  providers: [ProductService, {provide: OKTA_CONFIG, useValue: {oktaAuth}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
