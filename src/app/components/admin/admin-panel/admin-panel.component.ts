import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../common/product";
import {Observable} from "rxjs";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OktaAuth} from "@okta/okta-auth-js";
import myAppConfig from "../../../config/my-app-config";


@Component({
  selector: 'app-guards-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})


export class AdminPanelComponent implements OnInit {

  public products: Product[] = []
  public displayedColumns: string[] = ['id', 'name', 'price', 'actions']


  public isLoaded: boolean = false;


  public product: Product = new Product();

  constructor(private productService: ProductService, private router: Router) {
  }


  public ngOnInit(): void {

    this.productService.getProducts("http://localhost:8080/api/products/").subscribe((products: Product[]) => {
      this.products = products
      this.isLoaded = true;
    })
  }



  public updateProduct(id: String) {
    this.router.navigate(['/product-edit/' + id])
    return id;
  }


  public deleteProduct(id: string): void {

    this.productService.deleteProduct(Number(id))
      .subscribe(
        data => {
          console.log(data);
          // this.deleteMessage=true;
          this.productService.getProducts("http://localhost:8080/api/products/").subscribe(data => {
            this.products = data
          })
        },
        error => console.log(error));
  }
}











