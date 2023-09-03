import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { product } from '../models/products';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return []',fakeAsync ((done: DoneFn) => {

    const itemToRemove: product={
      id: undefined,
      title: '',
      description: '',
      list_price: undefined,
      discount_price: undefined,
      quantity: undefined,
      cartQty: undefined,
      categories: [],
      meta_description: '',
      meta_title: '',
      brand: {
        id: 0,
        url: ''
      },
      img_url: null
    };
    
    expect(component.cart.products).not.toContain(itemToRemove);
  }));
});
