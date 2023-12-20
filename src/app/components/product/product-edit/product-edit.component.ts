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

    this.productService.updateProduct(this.product).subscribe(
      () => {
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


  get ProductImageUrl() {
    return this.productUpdateForm.get('image_url');
  }

  get ProductUnitsInStock() {
    return this.productUpdateForm.get('unitsInStock');
  }



}
