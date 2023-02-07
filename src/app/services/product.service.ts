import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../common/product';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../common/product-category';
import {environment} from "./environment";
import {OKTA_AUTH} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = `${environment.baseUrl}/api/products`;

  private categoryUrl = `${environment.baseUrl}/api/product-category`;

  constructor(private httpClient: HttpClient,@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  deleteProduct(id: number): Observable<any> {
    // return this.http.delete(`${this.baseUrl}/delete-student/${id}`, { responseType: 'text' });
    const productUrl = `${this.baseUrl}/productId/${id}`;

    return this.httpClient.delete<Product>(productUrl);
  }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }


  getTest(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/admin-panel/test/`);
  }


  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number,
                         thePageSize: number,
                         theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  public getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }


  updateProduct(value: any): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/update-product`, value);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
