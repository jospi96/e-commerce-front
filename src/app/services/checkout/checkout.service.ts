import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { environment } from 'src/environment/environment';
import { HeaderService } from '../header/header.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient, private header: HeaderService) {}

  createOrder(order: Order) {
    return this.http.post(
      `${environment.domainUrl}${environment.api}order`,
      order
    );
  }

  payament(token: any) {
    return this.http.post
    (`${environment.domainUrl}${environment.api}payament`,token);
  }
  getToken() {
    return this.http.get<any>(
      `${environment.domainUrl}${environment.api}checkout`,
      { headers: this.header.getHeader() }
    );
  }
}
