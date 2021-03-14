import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: firebase.User;
  token: any;

  userData$ = this.fireAuth.authState
          .pipe(
            tap(u => {
              console.log({tapped: u});

              if (u === null) {
                this.router.navigate(['login']);
              } else if (!u.emailVerified) {
                this.router.navigate(['email-verify']);
              }

              this.user = u;
              this.token = u?.getIdToken();
            })
          );

  loggedIn$ = this.userData$.pipe(map(u => u !== null));

  idToken: any;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.fireAuth.onIdTokenChanged(u => {
      this.token = u?.getIdToken();
    });
  }

  SendVerificationMail() {
    this.user.sendEmailVerification();
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.fireAuth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Sign-out
  SignOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
