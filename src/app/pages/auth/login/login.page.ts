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
  }

  logIn(email, password) {
    this.auth.SignIn(email.value, password.value)
      .then((res) => {
        if (this.auth.isEmailVerified) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['email-verify']);
          return false;
        }
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  googleLogin() {
    this.auth.GoogleAuth();
  }
}
