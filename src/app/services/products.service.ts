import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { product } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProduct(page: number, limit: number): Observable<product> {
    return this.http.get<product>(
      `${environment.domainUrl}${environment.api}${environment.products}?page=${page}&limit=${limit}`
    );
  }

  getProductFilter(parm: string) {
    return this.http.get<product>(
      `${environment.domainUrl}${environment.api}${environment.products}?&parm=${parm}`
    );
  }
  getProductDetails(id: string) {
    return this.http.get<product>(
      `${environment.domainUrl}${environment.api}${environment.products}/${id}`
    );
  }
  getCategoryProduct(cat: string) {
    return this.http.get(
      `${environment.domainUrl}${environment.api}${environment.products}?&cat=${cat}`
    );
  }

  getDiscountProduct(page: number, limit: number, parm: string) {
    return this.http.get(
      `${environment.domainUrl}${environment.api}${environment.disountProducts}?page=${page}&limit=${limit}&cat=${parm}`
    );
  }
}
