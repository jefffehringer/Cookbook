import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { UserProfile } from '../models/user-profile.interface';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService extends StoreService<UserProfile> {
  private currentUserSubject = new BehaviorSubject<UserProfile>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  protected get currentUser(): UserProfile {
    return this.currentUserSubject.getValue();
  }
  protected set currentUser(val: UserProfile) {
    this.currentUserSubject.next(val == null ? null : { ...val });
  }


  constructor(protected http: HttpClient) {
    super(http,
      {
      url: environment.apiUrl + 'userprofiles/',
      idField: 'userProfileId',
      itemName: 'User Profile',
    });
  }

  newUser(authUser: firebase.User) {
    const newUser: Partial<UserProfile> = {
      userProfileId: authUser.uid,
      name: authUser.displayName,
      email: authUser.email,
    };

    this.add(newUser);
  }

  currentProfile() {
    return this.selected;
  }

  setCurrent(val: UserProfile) {
    this.currentUser = val;
  }

  selectDetail(id: string) {
    if (id === null) {
      this.selected = null;
      return;
    }

    this.loading = true;
    this.selected = null;

    this.http
      .get<UserProfile>(`${this.settings.url}${id}/detail`)
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error getting ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        this.replaceOrAdd(d);
        this.selected = d;
      });
  }

  loadUser(id: string | number) {
    if (id === null) {
      this.selected = null;
      return;
    }

    this.loading = true;
    this.selected = null;

    this.http
      .get<UserProfile>(`${this.settings.url}${id}`)
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error loading ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        this.replaceOrAdd(d);
        this.currentUser = d;
      });
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
