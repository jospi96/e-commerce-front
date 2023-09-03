import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
key=environment.key
user=environment.user
isAdmin=environment.isAdmin
logged = new  EventEmitter<boolean>();
  constructor() { }

setUser(user:User){
  this.key=user.key;
  this.user=JSON.stringify(user)
  this.isAdmin=user.is_admin
  environment.key=user.key
  environment.user=JSON.stringify(user)
  environment.isAdmin=user.is_admin
  this.logged.emit(true)

  localStorage.setItem('user',JSON.stringify(user))
}

logout(){
  localStorage.removeItem("user")
  localStorage.removeItem("key")
  environment.key=''
  environment.user=''
  environment.isAdmin=0
  this.logged.emit(false)

}
 /* isLoggedIn(){
if (this.user!=''){
  this.logged.emit(true)
}else{
  this.logged.emit(false)
}
  }*/
}