import { environment } from '@cook/environment/environment';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: firebase.User;
  idToken: any;

  get isLoggedIn(): boolean {
    if (!this.userData) {
      this.userData = JSON.parse(localStorage.getItem('user'));
    }
    return this.userData !== null && this.userData.emailVerified;
  }

  get isEmailVerified(): boolean {
    if (!this.userData) {
      this.userData = JSON.parse(localStorage.getItem('user'));
    }
    return this.userData && this.userData.emailVerified;
  }

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.fireAuth.authState.subscribe(user => {
      console.log({authState: user});

      this.NewUserData(user);
    });

    this.fireAuth.onIdTokenChanged(user => {
      console.log({onIdTokenChanged: user});

      this.NewUserData(user);
    });
  }

  private NewUserData(user: firebase.User) {
    if (user) {
      this.userData = user;
      this.idToken = this.userData.getIdToken();
      localStorage.setItem('user', JSON.stringify(this.userData));
    } else {
      localStorage.setItem('user', null);
      this.idToken = null;
    }
  }

  SendVerificationMail() {
    this.userData.sendEmailVerification();
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
      console.log(result);

      this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Store user in localStorage
  SetUserData(user) {
    // const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    /*const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })*/
  }

  // Sign-out
  SignOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
