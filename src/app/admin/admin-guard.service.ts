import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate() {
    return this.authService.user
      .map(user => user.isAdmin);
  }
}
