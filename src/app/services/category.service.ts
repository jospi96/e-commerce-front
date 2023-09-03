import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
getCategory(){
  return this.http.get(`${environment.domainUrl}${environment.api}${environment.categories}`);
}

getCategoryProducts(id:number){

 
  return this.http.get(`${environment.domainUrl}${environment.api}cat-products/${id}`);
}
  
}
//http://localhost:8000/api/cat-products/3