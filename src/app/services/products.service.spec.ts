import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductsServiceService', () => {
  let service: ProductsService
  let httpTestingController: HttpTestingController; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[ProductsService] 
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Product', fakeAsync(() => {
    const fakeUserData =null;

    let completed = false;

    service.getProduct(0,0).subscribe(data => {
      expect(data).toEqual(fakeUserData);
      completed = true;
    });


    tick(); 

    expect(completed).toBe(false);

  }));


  it('should get CategoryProducts', fakeAsync(() => {
    const fakeUserData =null;

    let completed = false;

    service.getCategoryProduct(null).subscribe(data => {
      expect(data).toEqual(fakeUserData);
      completed = true;
    });

   
    tick(); 

    expect(completed).toBe(false);

}));


it('should get Discount Product', fakeAsync(() => {
  const fakeUserData =null;

  let completed = false;

  service.getDiscountProduct(0,0,'').subscribe(data => {
    expect(data).toEqual(fakeUserData);
    completed = true;
  });

  
  tick(); 

  expect(completed).toBe(false);

}));


it('should get Product Details', fakeAsync(() => {
  const fakeUserData =null;

  let completed = false;

  service.getProductDetails('0').subscribe(data => {
    expect(data).toEqual(fakeUserData);
    completed = true;
  });

 
  tick(); 

  expect(completed).toBe(false);

}));


it('should get Product Filter', fakeAsync(() => {
  const fakeUserData =null;

  let completed = false;

  service.getProductFilter('0').subscribe(data => {
    expect(data).toEqual(fakeUserData);
    completed = true;
  });

 
  tick(); 

  expect(completed).toBe(false);

}));
});