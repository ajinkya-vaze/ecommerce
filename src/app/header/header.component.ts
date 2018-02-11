import { User } from './../user/user-model';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: User;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe( appUser => this.user = appUser);
  }

  logout() {
    this.authService.logout();
  }
}
