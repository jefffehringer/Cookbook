import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../models/user-profile.interface';

@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.scss'],
})
export class ProfileViewerComponent implements OnInit {
  @Input() profile: UserProfile;
  @Input() canEdit = false;

  constructor() { }

  ngOnInit() { }
}
