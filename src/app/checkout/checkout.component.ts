import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart/cart.service';

import { CheckoutService } from '../services/checkout/checkout.service';

import { NgForm } from '@angular/forms';
import { Order } from '../models/Order';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  

  user: User = {
    id: 0,
    key: '',
    name: '',
    surname: '',
    is_admin: 0,
    email: '',
    billing_address: '',
    billing_cauntry: '',
    billing_city: '',
    billing_post_code: '',
    business_name: '',
    phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_country: '',
    shipping_post_code: '',
    vat_number: '',
  };
  cart!: Cart;
  order:Order;


  constructor(
    private userService: UserService,
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) {
    
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.userService.getLoggedUser().subscribe((loggedUser: any) => {
      this.user = loggedUser.data;
    });
  }

  createOrder(event: Event, form: NgForm): void {
    let product: any = [];
    this.cart.products.forEach((prod) => {
      product.push({ id: prod.id, quantity_products: prod.cartQty });
    });
    //event.preventDefault();
    let orderData: Order = {
      first_name: form.value.name,
      last_name: form.value.last_name,
      tel: form.value.tel,
      email: form.value.email,
      id_customer: this.user.id,
      products: product!,
      discountCodeId: this.cart.discount[0] ? this.cart.discount[0].id : 0,
      shipping_address: form.value.shippingAddress,
      shipping_city: form.value.shippingcity,
      shipping_country: form.value.shippingCountry,
      shipping_postal_code: form.value.shippingPostCode,

      invoice_address: form.value.invoiceAddress,
      invoice_city: form.value.invoicecity,
      invoice_country: form.value.invoiceCountry,
      invoice_postal_code: form.value.invoicePostCode,

    };

    console.log(orderData);
    console.log(this.cart.products);
    this.checkoutService.createOrder(orderData).subscribe((data: any) => {
      this.order=data;
      
    });
     
  }
 
}
