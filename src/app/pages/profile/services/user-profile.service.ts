import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { HttpService } from '@cook/store/http.service';
import { UserProfile } from '../models/user-profile.interface';
import firebase from 'firebase/app';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends StoreService<UserProfile> {
  constructor(
    protected http: HttpService<UserProfile>
  ) {
    super(
      http,
      {
        url: environment.apiUrl + 'user-profiles/',
        idField: 'id',
        itemName: 'User Profile'
      }
    );
  }

  newUser(authUser: firebase.User) {
    const newUser: UserProfile = {
      uid: authUser.uid,
      name: authUser.displayName,
      email: authUser.email,
      id: null,
      location: ''
    };

    this.add(newUser);
  }

  currentProfile() {
    return this.selected;
  }

  loadUser(authUser: firebase.User) {
    console.log({loading: authUser});

    this.loading = true;

    this.http.getAll(`${this.settings.url}uid/${authUser.uid}`)
      .pipe(
        catchError(e => {
          this.getError = e;
          return throwError(`Error loading ${this.settings.itemName}`);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(d => {
        if (d && d.length > 0) {
          this.selected = d[0];
        }
      });
  }
}
