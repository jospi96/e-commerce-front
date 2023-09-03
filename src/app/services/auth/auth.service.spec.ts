import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from 'src/app/models/user';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       providers:[AuthService] });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout', () => {
    service.logout()
  });
  it('should set user data and emit "logged" event', () => {
    // Dati utente di esempio
    const user: User = {
      key: 'user_key',
      is_admin: 1,
      id: 0
    };
    const emitSpy = spyOn(service.logged, 'emit');
    service.setUser(user);
    expect(service.key).toBe('user_key');
    expect(service.user).toBe(JSON.stringify(user));
    expect(service.isAdmin).toBe(1);
    expect(service.key).toBe('user_key');
    expect(service.user).toBe(JSON.stringify(user));
    expect(service.isAdmin).toBe(1);
    expect(emitSpy).toHaveBeenCalledWith(true);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    expect(storedUser).toEqual(user);
  });
});
