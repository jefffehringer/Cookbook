import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/user-profile.interface';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.page.html',
  styleUrls: ['./profile-edit-page.page.scss'],
})
export class ProfileEditPagePage implements OnInit {
  profile$ = this.profileService.currentUser$;

  constructor(
    private profileService: UserProfileService
  ) { }

  ngOnInit() {
    this.profileService.updateSuccess$.subscribe((prof) => {
      this.profileService.setCurrent(prof);
      // TODO: go back to the profile view page
    });
  }

  save(profile: UserProfile) {
    this.profileService.update(profile);
  }
}
