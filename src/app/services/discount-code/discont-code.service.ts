import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountCode } from 'src/app/models/DiscountCode';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscontCodeService {

  constructor(private http:HttpClient) { }


  getDiscountCodeByCode(code: string):Observable<DiscountCode> {
    return this.http.get <DiscountCode> (`${environment.domainUrl}${environment.api}${environment.discountCode}\?code=${code}`)
  }
}
