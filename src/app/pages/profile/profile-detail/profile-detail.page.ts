import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserProfile } from '../models/user-profile.interface';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
})
export class ProfileDetailPage implements OnInit {
  profile$ = this.profileService.selected$.pipe(tap(console.log));

  constructor(
    private profileService: UserProfileService
  ) { }

  ngOnInit() {
    this.profileService.updateSuccess$.subscribe((prof) => {
      this.profileService.select(prof);
      // TODO: go back to the profile view page
    });
  }

  save(profile: UserProfile) {
    this.profileService.update(profile);
  }
}
