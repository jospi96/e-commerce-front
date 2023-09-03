/*import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Cart } from 'src/app/models/cart';
import { HttpClientTestingModule } from '@angular/common/http/testing';

  let service: CartService;
  let cart:Cart={
    products: [],
    shipping: '',
    total: undefined,
    discount: [],
    id: 1,
    id_user: undefined
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
    
  });
  ;
  it('should remove an item from the local cart', () => {

    service.addToCart(null,0);
    expect(cart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

*/