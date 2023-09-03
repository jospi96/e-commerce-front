import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart/cart.service';
import { environment } from 'src/environment/environment';
import { product } from '../models/products';
import { DiscontCodeService } from '../services/discount-code/discont-code.service';
import { DiscountCode } from '../models/DiscountCode';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  addToCart(itemToRemove: product) {
    throw new Error('Method not implemented.');
  }
  cart!: Cart;
  imgPath = environment.imgPath;
  noImg = environment.noImg;
  errQuant = '';
  disountNotFind = '';
  constructor(
    private cartService: CartService,
    private discountCodeService: DiscontCodeService
  ) {}
  ngOnInit() {
   
      this.cart = this.cartService.getCart();
    
    //console.log(this.cart)
   this.cartService.getCartEvent().subscribe((data: Cart) => {
      this.cart = data;
    });
  }

  removeCart(item: product) {
    this.cartService.removeCart(item);
  }

  applyDiscountCode(code: string) {
    this.disountNotFind = this.cartService.applyDiscountCode(code);
  }
  removeDiscountCode(item: DiscountCode) {
    this.cartService.removeDiscountCode(item);
  }
  replaceQuantity(data : product,quantity: string){
    this.cartService.addToCart(data,Number(quantity));
  }
}
