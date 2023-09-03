import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'e-commerce';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    let user = localStorage.getItem('user');
    
    if (localStorage.getItem('key') && user) {
    let  users=JSON.parse(user)
      this.authService.setUser(JSON.parse(user))
      
      
    }
  }
}
