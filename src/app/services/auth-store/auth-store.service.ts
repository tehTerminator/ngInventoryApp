import { Injectable } from '@angular/core';
import { AuthState } from './../../interface/auth-state';
import { AnonymousUser, User, UserData } from './../authentication/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private _state: AuthState = AuthState.LOGGED_OUT;
  /**
   * Holds Current User Data
   */
  private _user = new BehaviorSubject<User>(new User({ ...AnonymousUser }));

  constructor() {}

  /**
   * Store New User
   * @param userData UserData as Received from Server
   * @param expirationTime UnixTime when Token is about to expire
   * @returns void
   */
  signIn(userData: UserData, expirationTime: number): void {
    const currentTime = new Date().getTime();
    if (expirationTime < currentTime) {
      this._state = AuthState.LOGGED_OUT;
      return;
    }

    if (userData.id > 0) {
      const newUser = new User(userData);
      this._user.next(newUser);
      this._state = AuthState.LOGGED_IN;
      return;
    }

    this._state = AuthState.LOGGED_OUT;
  }

  /**
   * Remove Stored User
   */
  signOut(): void {
    this._user.next(new User({ ...AnonymousUser }));
    this._state = AuthState.LOGGED_OUT;
  }

  authStarted(): void {
    this.signOut();
    this._state = AuthState.STARTED;
  }

  get user(): User {
    return this._user.value;
  }

  get state(): AuthState {
    return this.state;
  }
}
