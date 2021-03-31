import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.loggedIn$.subscribe(l => {
      if (l) {
        this.router.navigate(['/']);
      }
    });
  }

  logIn(email, password) {
    this.auth.signIn(email.value, password.value)
      .then((res) => {
        this.router.navigate(['/']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  googleLogin() {
    this.auth.googleAuth();
  }
}
