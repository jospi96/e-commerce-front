import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  login(form: NgForm) {
    let loginParams = JSON.parse(
      JSON.stringify({
        email: form.value.email,
        password: form.value.password,
      })
    );
    console.log(form.value.password);

    this.userService.login(loginParams).subscribe(
      (data: any) => {
        this.message = data.message;
        console.log(data);
        this.authService.setUser(data.user);
       // this.authService.isLoggedIn();
        this.router.navigate(['home']);
      },
      (err: HttpErrorResponse) => {
        this.message = err.error.message;
      }
    );
  }
}
