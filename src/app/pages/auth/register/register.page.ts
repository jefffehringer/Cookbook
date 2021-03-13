import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  signUp(email, password){
    this.auth.RegisterUser(email.value, password.value)
    .then((res) => {
      res.user.sendEmailVerification();
      this.router.navigate(['email-verify']);
    }).catch((error) => {
      window.alert(error.message);
    });
  }
}
