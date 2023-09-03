import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate,Router,RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log(this.authService.isAdmin);
    if (this.authService.key != null && this.authService.key != "" && this.authService.isAdmin==1) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }



}