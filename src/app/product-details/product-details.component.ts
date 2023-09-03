import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { timeout } from 'rxjs';
import { environment } from '../../environment/environment';
import { product } from '../models/products';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}
  imgPath = environment.imgPath;
  noImg = environment.noImg;
  product!: product;
  counter = 1;
  errQuant = '';
  cartMessage = '';

  ngOnInit(): void {
    this.counter = 1;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getProductDetails('' + params.get('id'));
    });
  }
  getProductDetails(id: string) {
    this.productsService.getProductDetails(id).subscribe((data: any) => {
      this.product = data.data;
      console.log(this.product);
    });
  }

  addCounter() {
    this.errQuant = '';
    this.counter++;
    if (this.counter > this.product.quantity) {
      this.counter--;
      this.errQuant = `Insufficient quantity maximum${this.product.quantity}`;
      setTimeout(() => {
        this.errQuant = ``;
      }, 2000);
    }
  }
  removeCouter() {
    this.errQuant = '';
    this.counter--;
    if (this.counter < 0) {
      this.counter = 0;
      this.errQuant = `You can't buy zero`;
      setTimeout(() => {
        this.errQuant = ``;
      }, 2000);
    }
  }

  addCart() {
    const message = this.cartService.addToCart(this.product, this.counter);
    this.cartMessage = message;
  }
  removeCart(){
    this.cartService.removeCart(this.product)
  }
  isOnCart(){
   return this.cartService.isOnCart(this.product);
  }
}
