import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserProfile } from '../models/user-profile.interface';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  @Input() profile: UserProfile;

  @Output() saveProfile = new EventEmitter<UserProfile>();
  @Output() goBack = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  submitForm() {
    this.saveProfile.emit(this.profile);
  }

  back() {
    this.goBack.emit();
  }
}
