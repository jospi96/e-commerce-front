import { Component, Input } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';
import { CheckoutService } from '../services/checkout/checkout.service';
import { Order } from '../models/Order';
@Component({
  selector: 'app-payament',
  templateUrl: './payament.component.html',
  styleUrls: ['./payament.component.css']
})
export class PayamentComponent {
  stripe: Stripe;
  card: StripeCardElement;
  @Input() order:Order
constructor(
  private checkoutService: CheckoutService

){
  this.loadStripe();
}

  async loadStripe() {
    this.stripe = await loadStripe(environment.publicKeyStripe);
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  async submitPayment() {
    const { token, error } = await this.stripe.createToken(this.card);
    if (error) {
      console.error(error);
    } else {

      this.checkoutService.payament({IdOrder:111,tokenStripe:token}).subscribe((data) => {
      });
     
    }
  }
}
