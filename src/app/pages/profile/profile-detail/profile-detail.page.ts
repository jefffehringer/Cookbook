import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UserProfile } from '../models/user-profile.interface';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
})
export class ProfileDetailPage implements OnInit {
  private profileId = '';
  profile$ = this.profileService.selected$;

  canEdit$ = combineLatest([this.profile$, this.profileService.currentUser$]).pipe(
    filter(([profile, currentUser]) => profile !== null && currentUser !== null),
    map(
      ([profile, currentUser]) =>
        profile.userProfileId === currentUser.userProfileId
    )
  );

  constructor(
    private profileService: UserProfileService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.profileId = this.route.snapshot.paramMap.get('id');
    this.profileService.selectDetail(this.profileId);
  }
}
