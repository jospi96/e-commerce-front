import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HeaderService } from '../header/header.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private header:HeaderService) { }

  login(loginParams:JSON){
   return this.http.post(
      `${environment.domainUrl}${environment.api}login`,loginParams
      )

  }

  register(registerParams:JSON){
    return this.http.post(

      `${environment.domainUrl}${environment.api}register`,registerParams,{
        observe:"response"}
    )
}

getLoggedUser():Observable<User>{
  return this.http.get<User>(
    `${environment.domainUrl}${environment.api}${environment.userShow}`,
  {headers:this.header.getHeader()})
}
}
