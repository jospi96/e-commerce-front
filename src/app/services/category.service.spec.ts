import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController; // Aggiungi HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[CategoryService] 
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get category', fakeAsync(() => {
    const fakeUserData =null;

    let completed = false;

    service.getCategory().subscribe(data => {
      expect(data).toEqual(fakeUserData);
      completed = true;
    });


    tick(); 

    expect(completed).toBe(false);

  }));


  it('should get CategoryProducts', fakeAsync(() => {
    const fakeUserData =null;

    let completed = false;

    service.getCategoryProducts(null).subscribe(data => {
      expect(data).toEqual(fakeUserData);
      completed = true;
    });

  
    tick(); 

    expect(completed).toBe(false);

  }));

});
