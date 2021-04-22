import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { UserProfile } from '../models/user-profile.interface';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService extends StoreService<UserProfile> {
  constructor(protected http: HttpClient) {
    super(http,
      {
      url: environment.apiUrl + 'userprofiles/',
      idField: 'uid',
      itemName: 'User Profile',
    });
  }

  newUser(authUser: firebase.User) {
    const newUser: UserProfile = {
      userProfileId: authUser.uid,
      name: authUser.displayName,
      email: authUser.email,
      location: '',
    };

    this.add(newUser);
  }

  currentProfile() {
    return this.selected;
  }

  /*loadUser(authUser: firebase.User) {
    this.loading = true;

    this.http
      .getAll(`${this.settings.url}uid/${authUser.uid}`)
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error loading ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        if (d && d.length > 0) {
          this.selected = d[0];
        }
      });
  }*/
}
