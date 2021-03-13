import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/security/auth.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.page.html',
  styleUrls: ['./email-verify.page.scss'],
})
export class EmailVerifyPage implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  resend() {
    this.auth.SendVerificationMail();
  }
}
