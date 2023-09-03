import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  message=""
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  register(registeerForm: NgForm) {
    let user = {
      first_name: registeerForm.value.name,
      last_name: registeerForm.value.lastName,
      email: registeerForm.value.email,
      email_confirmation: registeerForm.value.confirmEmail,
      password: registeerForm.value.password,
      password_confirmation: registeerForm.value.confirmPassword,
      phone: registeerForm.value.tel,
      vat_number: registeerForm.value.vatNumber,
      business_name: registeerForm.value.businessName,
      shipping_address: registeerForm.value.shippingAddress,
      shipping_city: registeerForm.value.shippingcity,
      shipping_post_code: registeerForm.value.shippingPostCode,
      shipping_country: registeerForm.value.shippingCountry,
      billing_address: registeerForm.value.invoiceAddress,
      billing_city: registeerForm.value.invoicecity,
      billing_post_code: registeerForm.value.invoicePostCode,
      billing_cauntry: registeerForm.value.invoiceCountry,
    };
    this.userService
      .register(JSON.parse(JSON.stringify(user)))
      .subscribe((data: any) => {
        if (data['status'] == 201) {
          console.log(data);
          this.authService.setUser(data.body.user);
          this.router.navigateByUrl("home")
        }
        
        
      },  error => {
        this.message=error.error.message
      })
  }
}
