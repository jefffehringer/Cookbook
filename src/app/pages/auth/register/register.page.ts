import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from 'app/pages/profile/services/user-profile.service';
import { AuthService } from 'app/services/security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserProfileService
  ) { }

  ngOnInit() {
  }

  signUp(email, password){
    this.auth.registerUser(email.value, password.value)
      .then((res) => {
        res.user.sendEmailVerification();
        this.userService.newUser(res.user);
        this.router.navigate(['email-verify']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }
}
