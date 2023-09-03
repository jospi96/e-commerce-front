import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HeaderService } from '../header/header.service';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  constructor(
    private http: HttpClient,
    private header:HeaderService) {}

  getUserCart(id: number) {
    return this.http.get(
      `${environment.domainUrl}${environment.api}cart/${id}`
    ,{headers:this.header.getHeader()});
  }

  addToCart(idCart: Number,data: any) {
    return this.http.post(`${environment.domainUrl}${environment.api}cart/${idCart}`
   ,data ,{headers:this.header.getHeader()})
  }

  removeToCart(idCart: Number,data: any) {
    return this.http.put(`${environment.domainUrl}${environment.api}cart/${idCart}`
    ,data,{headers:this.header.getHeader()});
  }
}
