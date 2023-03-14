import { Component, OnInit } from '@angular/core';
import {Product} from "../../../common/product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public isUpdated: boolean = false;
  public product: Product = new Product();
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

  public onSubmit(): void {
    const currentId = this.product.id

    this.product = new Product();
    this.product.id = currentId;
    this.product.name = this.ProductName.value;
    this.product.sku = this.ProductSku.value;
    this.product.description = this.ProductDescription.value;
    this.product.unitPrice = this.ProductUnitPrice.value;
    this.product.imageUrl = this.ProductImageUrl.value;
    this.product.unitsInStock = this.ProductUnitsInStock.value;

    this.productService.updateProduct(this.product).subscribe(
      data => {
        this.isUpdated = true;
        this.productService.getProducts("http://localhost:8080/api/products").subscribe(data => {
          this.products = data
          console.log("product to be updated" + data);
        })
      },
      error => console.log(error));
  }


  public get ProductName(): AbstractControl {
    return this.productUpdateForm.get('name');
  }

  public get ProductSku(): AbstractControl {
    return this.productUpdateForm.get('sku');
  }

  public get ProductDescription(): AbstractControl {
    return this.productUpdateForm.get('description');
  }

  public get ProductUnitPrice(): AbstractControl {
    return this.productUpdateForm.get('unitPrice');
  }

  public get ProductId(): AbstractControl {
    return this.productUpdateForm.get('id');
  }

  public get ProductImageUrl(): AbstractControl {
    return this.productUpdateForm.get('image_url');
  }

  public get ProductUnitsInStock(): AbstractControl {
    return this.productUpdateForm.get('unitsInStock');
  }

  public get ProductCategoryId(): AbstractControl {
    return this.productUpdateForm.get('categoryId');
  }

}
