import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { product } from '../models/products';
import { ProductsService } from '../services/products.service';
import { environment } from '../../environment/environment';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../models/cart';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  cart!: Cart;
  imgPath = environment.imgPath;
  noImg = environment.noImg;
  menu = false;
  userMenu = false;
  cartItem = 0;
  products: product[] = [];
  categories: Category[] = [];
  user = false;
  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private cartservice: CartService,
    private router: Router,
    private authService: AuthService,
    private dc: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
    this.authService.logged.subscribe((user: boolean) => {
      this.user = user;
      this.cart = this.cartservice.getCart();
      this.cartItem=this.cart.products.length;

    });
    let us = localStorage.getItem('user');
    if (us) {
      this.user = true;
      this.authService.setUser(JSON.parse(us));
    }

    this.cart = this.cartservice.getCart();
    this.cartItem = this.cart.products.length;

    this.cartservice.getCartEvent().subscribe((data: Cart) => {
      // console.log(data);
      this.cartItem = data.products.length;
      this.cart = data;
    });

    this.categoryService.getCategory().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  search(parm: string) {
    this.productsService.getProductFilter(parm).subscribe((data: any) => {
      this.products = data['data'];
      console.log(this.products);
    });
  }
  openDetails(id: Number) {
    this.router.navigateByUrl(`details/${id}`);
  }

  isOnCart(product: product) {
    return this.cartservice.isOnCart(product);
  }
  removeCart(item: product) {
    this.cartservice.removeCart(item);
  }

  logout() {
    this.authService.logout();
   // this.user = false;
    this.router.navigate(['login']);
  }
  login() {}
}
