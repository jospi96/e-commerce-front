import { EventEmitter, Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { product } from 'src/app/models/products';
import { DiscontCodeService } from '../discount-code/discont-code.service';
import { DiscountCode } from 'src/app/models/DiscountCode';
import { environment } from 'src/environment/environment';
import { User } from 'src/app/models/user';
import { CartApiService } from './cart-api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart!: Cart;
  cartEm = new EventEmitter<Cart>();
  disountNotFind = '';

  constructor(
    private cartApiService: CartApiService,
    private discountCodeService: DiscontCodeService
  ) {
    /*this.cart = {
      products: [],
      shipping: '0',
      total: 0,
      discount: [],
      id: 0,
      id_user: 0,
    };*/
  }

  getLocalCart() {
    let localCart = localStorage.getItem('cart');
    if (localCart) {
      return JSON.parse(localCart);
    } else
      return {
        products: [],
        shipping: '0',
        total: 0,
        discount: [],
        id: 0,
        id_user: 0,
      };
  }
  getCart() {
    this.cart = this.getLocalCart();

    if (environment.user != '') {
      let user: User = JSON.parse(environment.user);
      this.cartApiService.getUserCart(user.id).subscribe((data: any) => {
        console.log(data);
        this.cart.id = data.data.id;
        
        if (data.data.id > 0) {
          this.getLocalCart().products.forEach((product: any) => {
            if (!data.data.products.find((item: { id: any; }) => item.id == product.id)) {
              this.addToCart(product, product.cartQty);
            }
          });
          data.data.products.forEach((product: any) => {
            if (!this.cart.products.find((item) => item.id == product.id)) {
              this.cart.products.push(product);
            }
          });

          localStorage.removeItem('cart');
        }
        this.cartTotal();
        this.cartEm.emit(this.cart);
      });
    }

    //  this.cartEm.emit(this.cart)
    return this.cart;
  }
  getCartEvent() {
    if (this.cart.id === 0) {
      let localCart = localStorage.getItem('cart');
      if (localCart) {
        this.cart = JSON.parse(localCart);
      }
    }
    this.cartTotal();
    this.cartEm.emit(this.cart);

    return this.cartEm;
  }
  addToCart(item: product, cartQty: Number) {
    if (this.cart.id > 0) {
      this.cartApiService
        .addToCart(this.cart.id, {
          cart_id: this.cart.id,
          product_id: item.id,
          quantity_product: cartQty,
        })
        .subscribe((data) => {
          console.log(data);
        });
      if (!this.cart.products.find((products) => products.id == item.id)) {
        this.cart.products.push(item);
      }
      this.cartTotal();
      this.cartEm.emit(this.cart);
      return 'true';
    }
    let localCart = localStorage.getItem('cart');
    item.cartQty = cartQty;
    if (!localCart) {
      this.cart.products.push(item);
      this.cartEm.emit(this.cart);
      this.cartTotal();

      localStorage.setItem('cart', JSON.stringify(this.cart));
    } else {
      this.cart = JSON.parse(localCart);
      if (this.cart.products.find((product) => product.id == item.id)) {
        this.cart.products = this.cart.products.filter(
          (product) => product.id !== item.id)

      } 
        this.cart.products.push(item);
        this.cartTotal();
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.cartEm.emit(this.cart);
      
    }
    return 'true';
  }
  removeCart(item: product) {
    if (this.cart.id > 0) {
      this.cartApiService
        .removeToCart(this.cart.id, {
          cart_id: this.cart.id,
          product_id: item.id,
        })
        .subscribe((data) => {
          console.log(data);
        });
      this.cart.products = this.cart.products.filter(
        (product) => product.id !== item.id
      );
      this.cartTotal();
      this.cartEm.emit(this.cart);
    } else {
      let localCart = localStorage.getItem('cart');
      if (localCart) {
        this.cart = JSON.parse(localCart);
        this.cart.products = this.cart.products.filter(
          (product) => product.id !== item.id
          
        );
        this.cartTotal();
        this.cartEm.emit(this.cart);

        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
  }

  isOnCart(item: product) {
    if (this.cart.id > 0) {
      if (this.cart.products.find((product) => product.id == item.id)) {
        return true;
      }
    }
    let localCart = localStorage.getItem('cart');
    if (localCart) {
      this.cart = JSON.parse(localCart);
      if (this.cart.products.find((product) => product.id == item.id)) {
        return true;
      }
    }

    return false;
  }

  cartTotal() {
    let tot = Number(0);

    for (let prod of this.cart.products) {
      if (prod.discount_price) {
        tot += Number(prod.discount_price);
      } else {
        tot += Number(prod.list_price);
      }
    }
    if (this.cart.discount.length > 0) {
      let molt = (tot * Number(this.cart.discount[0].discont_percentual)) / 100;

      tot -= molt;
    }
    this.cart.total = tot;
    //this.cartEm.emit(this.cart);
    //localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeDiscountCode(item: DiscountCode) {
    this.cart.discount = this.cart.discount.filter(
      (discount) => discount.id !== item.id
    );
    console.log(this.cart.discount);
    this.cartTotal();
  }

  applyDiscountCode(code: string) {
    this.discountCodeService
      .getDiscountCodeByCode(code)
      .subscribe((discount: any) => {
        console.log(discount);
        if (!discount.data.status.status) {
          this.disountNotFind = discount.data.status.message;
        } else {
          this.cart.discount.push(discount.data);

          this.cartTotal();
        }
      });
    return this.disountNotFind;
  }
}
