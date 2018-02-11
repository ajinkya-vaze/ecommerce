import { UserService } from './user/user.service';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService) {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);
        this.router.navigateByUrl(localStorage.getItem('returnUrl'));
      }
    });
  }
}
