import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';

import { product } from '../models/products';
import { CategoryService } from '../services/category.service';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  filt="disc"
  imgPath = environment.imgPath;
  noImg = environment.noImg;
  constructor(private productsService: ProductsService,
    private cartService: CartService) {}

  ngOnInit(): void {
    
  }

  
  }



  
