import { UserService } from './user/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private firebaseAuthService: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = this.firebaseAuthService.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.firebaseAuthService.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.firebaseAuthService.auth.signOut();
  }

  get user() {
    return this.user$
    .switchMap(user => {
      if (user) {
        return this.userService.get(user.uid).valueChanges();
      }
      return Observable.of(null);
    });
  }
}
