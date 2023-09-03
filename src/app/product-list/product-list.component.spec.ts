import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ProductListComponent } from './product-list.component';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart/cart.service';
import { CategoryService } from '../services/category.service';
import { of } from 'rxjs';
import { Category } from '../models/category';
import { product } from '../models/products';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsService: ProductsService;
  let cartService: CartService;
  let categoryService: CategoryService;

  beforeEach(fakeAsync (() => {
     TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [ProductsService, CartService, CategoryService],
      imports: [HttpClientTestingModule]

    }).compileComponents();
  }));

  beforeEach(() => {


    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService);
    cartService = TestBed.inject(CartService);
    categoryService = TestBed.inject(CategoryService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories on init',fakeAsync(() => {
    component.page=1;
    const categories: Category[] = [{name:'',description: '',id: 23 ,img_url:'',meta_description:'',meta_title:''}];
    spyOn(categoryService, 'getCategory').and.returnValue(of(categories));
    fixture.detectChanges();
    expect(component.categories).toEqual(categories);
  }));

  it('should fetch products when in "disc"  mode', fakeAsync(() => {
    const products: product[] =[]
    let prod:product={description: '',brand: {id:0,url:''},cartQty: 0,quantity:0,
    categories: [{name:'',description: '',id: 23 ,img_url:'',meta_description:'',meta_title:''}],
    discount_price:0,id:0,img_url:[{url:'',cover:''}],list_price:0,meta_description:'',
    meta_title:'',title:''}
    spyOn(productsService, 'getProduct').and.returnValue(of(prod));

    component.filt = 'disc'; 
    fixture.detectChanges();

    tick(); 

    expect(component.products).toEqual(products);
  }));
  it('should fetch products when  in  "cate" mode', fakeAsync(() => {
    const products: product[] =[]
    component.page=1;

    let prod:product={description: '',brand: {id:0,url:''},cartQty: 0,quantity:0,
    categories: [{name:'',description: '',id: 23 ,img_url:'',meta_description:'',meta_title:''}],
    discount_price:0,id:0,img_url:[{url:'',cover:''}],list_price:0,meta_description:'',meta_title:'',title:''}
    spyOn(productsService, 'getProduct').and.returnValue(of(prod));

    component.filt = 'cate'; 
    fixture.detectChanges();

    tick();

    expect(component.products).toEqual(products);
  }));
  it('should get products', fakeAsync(() => {
    const mockProducts = [
      {description: '',brand: {id:0,url:''},cartQty: 0,quantity:0,
    categories: [{name:'',description: '',id: 23 ,img_url:'',meta_description:'',meta_title:''}],
    discount_price:0,id:0,img_url:[{url:'',cover:''}],list_price:0,meta_description:'',
    meta_title:'',title:''}]
    const prod:product={description: '',brand: {id:0,url:''},cartQty: 0,quantity:0,
    categories: [{name:'',description: '',id: 23 ,img_url:'',meta_description:'',meta_title:''}],
    discount_price:0,id:0,img_url:[{url:'',cover:''}],list_price:0,meta_description:'',
    meta_title:'',title:''}

    spyOn(productsService, 'getProduct').and.returnValue(of(prod));
  
    component.getProducts(1, 10);
  
    tick();

    expect(component.products).toEqual(undefined);
  }));


  it('should get cat products', fakeAsync(() => {
    const mockProducts = [
      {description: '',brand: {id:0,url:''},cartQty: 0,quantity:0,
    categories: [{name:'',description: '',id: 23 ,img_url:'',meta_description:'',meta_title:''}],
    discount_price:0,id:0,img_url:[{url:'',cover:''}],list_price:0,meta_description:'',
    meta_title:'',title:''}]
    const prod:product={description: '',brand: {id:0,url:''},cartQty: 0,quantity:0,
    categories: [{name:'',description: '',id: 23 ,img_url:'',meta_description:'',meta_title:''}],
    discount_price:0,id:0,img_url:[{url:'',cover:''}],list_price:0,meta_description:'',
    meta_title:'',title:''}
component.filt="cate"
    spyOn(categoryService, 'getCategoryProducts').and.returnValue(of(prod));
  
    component.getCatProduct(23);
  
    tick();

    expect(component.products).toEqual([prod]);
  }));
  
  
  
  
  
  
  

  // You can add more tests for different scenarios, e.g., testing pagination, cart functionality, etc.
});