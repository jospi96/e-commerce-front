import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartApiService } from './cart-api.service';
import { HeaderService } from '../header/header.service';
import { of } from 'rxjs';

describe('CartApiService', () => {
  let service: CartApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartApiService, HeaderService]
    });

    service = TestBed.inject(CartApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item from the cart', fakeAsync(() => {
    const fakeData = null;
    
    let completed = false;

    service.addToCart(fakeData, fakeData).subscribe(data => {
      expect(data).toEqual(fakeData);
      completed = true;
    });

   
    expect(completed).toBe(false);
  }));

  it('should get user cart', fakeAsync(() => {
    const fakeUserData =null;

    let completed = false;

    service.getUserCart(fakeUserData).subscribe(data => {
      expect(data).toEqual(fakeUserData);
      completed = true;
    });

 

    expect(completed).toBe(false);
  }));

  it('should remove an item from the cart', fakeAsync(() => {
    const fakeDataToRemove = null;

    let completed = false;

    service.removeToCart(fakeDataToRemove, fakeDataToRemove).subscribe(data => {
      expect(data).toEqual(fakeDataToRemove);
      completed = true;
    });



    expect(completed).toBe(false);
  }));

  afterEach(() => {
  });
});