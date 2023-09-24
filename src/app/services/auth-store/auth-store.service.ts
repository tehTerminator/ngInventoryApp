import { Injectable } from '@angular/core';
import { AuthState } from './../../interface/auth-state';
import { AnonymousUser, User, UserData } from './../authentication/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private _state = new BehaviorSubject<AuthState>(AuthState.LOGGED_OUT);
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
      this._state.next(AuthState.LOGGED_OUT);
      return;
    }

    if (userData.id <= 0) {
      this._state.next(AuthState.LOGGED_OUT);
      return;
    }

    const newUser = new User(userData);
    this._user.next(newUser);
    this._state.next(AuthState.LOGGED_IN)
    return;
  }

  /**
   * Remove Stored User
   */
  signOut(): void {
    this._user.next(new User({ ...AnonymousUser }));
    this._state.next(AuthState.LOGGED_OUT);
  }

  authStarted(): void {
    this.signOut();
    this._state.next(AuthState.STARTED);
  }

  get user(): User {
    return this._user.value;
  }

  get state(): Observable<AuthState> {
    return this._state;
  }

  get state_value(): AuthState {
    return this._state.value;
  }
}
