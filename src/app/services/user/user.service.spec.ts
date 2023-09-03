import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeaderService } from '../header/header.service';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController; // Aggiungi HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, HeaderService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController); // Inietta HttpTestingController
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', fakeAsync(() => {
    const fakeUserData =null;

    let completed = false;

    service.register(fakeUserData).subscribe(data => {
      expect(data).toEqual(fakeUserData);
      completed = true;
    });

    

    tick(); 
    expect(completed).toBe(false);

  }));



it('should login a user', fakeAsync(() => {
  const fakeUserData =null;

  let completed = false;

  service.login(fakeUserData).subscribe(data => {
    expect(data).toEqual(fakeUserData);
    completed = true;
  });

  
  tick(); 

  expect(completed).toBe(false);

}));

it('should getLoggedUser a user', fakeAsync(() => {
  

  let completed = false;

  service.getLoggedUser().subscribe(data => {
    expect(data).toEqual(null);
    completed = true;
  });

  


  tick(); // Attendi che le operazioni asincrone vengano completate.

  expect(completed).toBe(false);

}));
});