import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DiscontCodeService } from './discont-code.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DiscontCodeService', () => {
  let service: DiscontCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [DiscontCodeService]
    });
    service = TestBed.inject(DiscontCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Discount Code By Code', fakeAsync(() => {
    const fakeUserData =null;

    let completed = false;

    service.getDiscountCodeByCode(null).subscribe(data => {
      expect(data).toEqual(fakeUserData);
      completed = true;
    });

  
    tick(); 

    expect(completed).toBe(false);

  }));

});
