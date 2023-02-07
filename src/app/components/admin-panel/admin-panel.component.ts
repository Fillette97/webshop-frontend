import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {Observable} from "rxjs";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OktaAuth} from "@okta/okta-auth-js";
import myAppConfig from "../../config/my-app-config";


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})


export class AdminPanelComponent implements OnInit {

  public products: Product[] = []
  public displayedColumns: string[] = ['id', 'name', 'price', 'actions']


  isLoaded: boolean = false;
  // isUpdated:boolean= false;

  product: Product = new Product();

  constructor(private productService: ProductService, private router: Router) {
  }


  ngOnInit(): void {
    // this.productService.getTest().subscribe(() => {
    // });

    this.productService.getProducts("http://localhost:8080/api/products").subscribe((products: Product[]) => {
      console.log("PRODUCTS INSIDE SUB" + products)
      this.products = products
      this.isLoaded = true;
    })
  }

  // productUpdateForm=new FormGroup({
  //   id:new FormControl(),
  //   name:new FormControl(),
  //   sku:new FormControl(),
  //   categoryId:new FormControl()
  // });

  updateProduct(id: String) {
    console.log("THIS product ID in admin" + id);
    this.router.navigate(['/product-edit/' + id])
    return id;
  }

  // updateProd(updProd){
  //   this.product= new Product();
  //   this.product.id =this.ProductId.value;
  //   this.product.name=this.ProductName.value;
  //   this.product.sku=this.ProductSku.value;
  //   this.product.description=this.ProductDescription.value;
  //   this.product.unitPrice=this.ProductUnitPrice.value;
  //   this.product.imageUrl=this.ProductImageUrl.value;
  //   this.product.unitsInStock = this.ProductUnitsInStock.value;
  //   // this.product.category_id = this.ProductCategoryId.value;
  //   console.log(this.ProductName.value);
  //
  //
  //   this.productService.updateProduct(Number(this.product.id),this.product).subscribe(
  //     data => {
  //       this.isUpdated=true;
  //       this.productService.getProducts("http://localhost:8080/api/products").subscribe(data =>{
  //         this.products = data
  //       })
  //     },
  //     error => console.log(error));
  // }
  //
  // get ProductName(){
  //   return this.productUpdateForm.get('name');
  // }
  //
  // get ProductSku(){
  //   return this.productUpdateForm.get('sku');
  // }
  //
  // get ProductDescription(){
  //   return this.productUpdateForm.get('description');
  // }
  //
  // get ProductUnitPrice(){
  //   return this.productUpdateForm.get('unitPrice');
  // }
  //
  // get ProductId(){
  //   return this.productUpdateForm.get('id');
  // }
  //
  // get ProductImageUrl(){
  //   return this.productUpdateForm.get('image_url');
  // }
  //
  // get ProductUnitsInStock(){
  //   return this.productUpdateForm.get('unitsInStock');
  // }
  // get ProductCategoryId(){
  //   return this.productUpdateForm.get('categoryId');
  // }
  //
  // changeIsUpdate(){
  //   this.isUpdated=false;
  // }
  //
  //

  deleteProduct(id: string) {

    this.productService.deleteProduct(Number(id))
      .subscribe(
        data => {
          console.log(data);
          // this.deleteMessage=true;
          this.productService.getProducts("http://localhost:8080/api/products").subscribe(data => {
            this.products = data
          })
        },
        error => console.log(error));
  }
}











