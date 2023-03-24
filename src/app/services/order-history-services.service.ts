import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OrderHistory} from "../common/order-history";
import {environment} from "./environment";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private baseUrl = `${environment.baseUrl}/api/orders`;

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {
    // need to build URL based on the customer email
    const orderHistoryUrl = `${this.baseUrl}/search/findByCustomerEmail?email=${theEmail}`;

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  }
}
