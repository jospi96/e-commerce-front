import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { product } from '../models/products';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart/cart.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: product[] = [];
  total: number = 0;
  imgPath = environment.imgPath;
  noImg = environment.noImg;
  nextPage: any;
  @Input() filt: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  page = 1;
  lastPage: number = 1;
  meta:any
  categories:Category[]=[]
  catId:number=-1
  category:string=''
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    console.log(this.filt);
    this.getMetod(this.filt, this.page, 8, '');

    this.categoryService.getCategory().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
    });


  }

  getMetod(met: String, page: number, limit: number, parm: string) {
    if (this.filt === 'disc') {
      this.getDiscontProduct(page, 4, parm);
    } else if(this.filt === 'cate'){
      this.getCatProduct(this.catId)
    }else{
      console.log('1');
      this.getProducts(page, limit);
    }
  }
  getProducts(page: number, limit: number) {
    this.productsService.getProduct(page, limit).subscribe((data: any) => {
      this.products = data['data'];

    });
  }
  getDiscontProduct(page: number, limit: number, parm: string) {
    this.productsService
      .getDiscountProduct(page, limit, parm)
      .subscribe((data: any) => {
        this.products = data.data;
       
      });
  }
  getCatProduct(id: number) {
  this.categoryService.getCategoryProducts(id).subscribe((data: any) => {
  this.products = data.data[0].product;
  console.log(data.data[0].product);
  this.filt="cate"
        this.catId=id
        this.category=data.data[0].name
  })

}

 

  isOnCart(product: product) {
    return this.cartService.isOnCart(product);
  }

  addCart(product: product) {
    const message = this.cartService.addToCart(product, 1);
    this.cd.detectChanges();

  }
  removeCart(product: product) {
    this.cartService.removeCart(product);
  }

  viewMore() {
    console.log(this.page + 'dfsdffdsf' + this.total);
    if (this.page + 1 <= this.lastPage) {
      this.page++;
      this.getMetod(this.filt,this.page, 8, '');
    }
  }
  viewback() {
    console.log(this.page + 'dfsdffdsf' + this.total);
    if (this.page - 1 >= 1) {
      this.page--;
      this.getMetod(this.filt,this.page, 8, '');
    }
  }
}
