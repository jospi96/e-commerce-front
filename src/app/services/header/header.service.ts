import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  getHeader() {

    return new HttpHeaders({
      "Accept": "application/json", "Content-Type": "application/json",
      "Authorization": `Bearer ${environment.key}`
    })
  }


}
