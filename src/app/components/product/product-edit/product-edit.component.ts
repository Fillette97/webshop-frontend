import {Component, OnInit} from '@angular/core';
import {Product} from "../../../common/product";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  isUpdated: boolean = false;
  product: Product = new Product();
  public products: Product[] = []

  public product_id = this.activatedRoute.snapshot.params.id;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("THIS product ID in edit" + this.product_id);
    this.productService.getProduct(this.product_id).subscribe(
      data => {
        console.log(data)
        this.product = data

      },
      error => console.log(error));
  }


  productUpdateForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    sku: new FormControl(),
    description: new FormControl(),
    unitPrice: new FormControl(),
    image_url: new FormControl(),
    unitsInStock: new FormControl(),
    categoryId: new FormControl(),
  });

  // updateProduct(id: String){
  //   this.productService.getProduct(Number(id))
  //     .subscribe(
  //       data => {
  //         console.log("this is product DATA" +  JSON.stringify(data))
  //         this.product=data
  //
  //       },
  //       error => console.log(error));


  // }

  onSubmit() {
    const currentId = this.product.id

    this.product = new Product();
    this.product.id = currentId;
    this.product.name = this.ProductName.value;
    this.product.sku = this.ProductSku.value;
    this.product.description = this.ProductDescription.value;
    this.product.unitPrice = this.ProductUnitPrice.value;
    this.product.imageUrl = this.ProductImageUrl.value;
    this.product.unitsInStock = this.ProductUnitsInStock.value;

    // this.productService.updateProduct(this.product).subscribe(
    //   data => {
    //     this.isUpdated = true;
    //     this.productService.getProducts("http://localhost:8080/api/products/").subscribe(data => {
    //       this.products = data
    //       this.router.navigateByUrl('/admin-panel')
    //     })
    //   },
    //   error => console.log(error));
    this.productService.updateProduct(this.product).subscribe(
      data => {
        this.isUpdated = true;
        this.productService.getProducts().subscribe(data => {
          this.products = data
          this.router.navigateByUrl('/admin-panel')
        })
      },
      error => console.log(error));
  }


  get ProductName() {
    return this.productUpdateForm.get('name');
  }

  get ProductSku() {
    return this.productUpdateForm.get('sku');
  }

  get ProductDescription() {
    return this.productUpdateForm.get('description');
  }

  get ProductUnitPrice() {
    return this.productUpdateForm.get('unitPrice');
  }

  get ProductId() {
    return this.productUpdateForm.get('id');
  }

  get ProductImageUrl() {
    return this.productUpdateForm.get('image_url');
  }

  get ProductUnitsInStock() {
    return this.productUpdateForm.get('unitsInStock');
  }

  get ProductCategoryId() {
    return this.productUpdateForm.get('categoryId');
  }

  changeIsUpdate() {
    this.isUpdated = false;
  }

}
