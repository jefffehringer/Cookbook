import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  signUp(email, password){
    this.auth.RegisterUser(email.value, password.value)
    .then((res) => {
      // Do something here
      console.log(res);
      res.user.sendEmailVerification();

    }).catch((error) => {
      window.alert(error.message);
    });
  }
}