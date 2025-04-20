import { computed, effect, Injectable, runInInjectionContext, Signal, signal } from '@angular/core';
import { AuthState } from './../../interface/auth-state';
import { AnonymousUser, User, UserData } from './../authentication/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private _state = signal(AuthState.LOGGED_OUT);
  // private _state = new BehaviorSubject<AuthState>(AuthState.LOGGED_IN); // Only For Testing Purpose
  /**
   * Holds Current User Data
   */
  private _user = signal(new User({...AnonymousUser}));

  constructor(private router: Router) {
    effect(()=>{
      if (this.state() === AuthState.LOGGED_IN) {
        this.router.navigate(['auth']);
        return;
      } 

      if(this.state() === AuthState.LOGGED_OUT) {
        this.router.navigate(['']);
        return;
      }
    })
  }

  /**
   * Store New User
   * @param userData UserData as Received from Server
   * @param expirationTime UnixTime when Token is about to expire
   * @returns void
   */
  signIn(userData: UserData, expirationTime: number): void {
    const currentTime = new Date().getTime();
    if (expirationTime < currentTime) {
      this._state.set(AuthState.LOGGED_OUT);
      return;
    }

    if (userData.id <= 0) {
      this._state.set(AuthState.LOGGED_OUT);
      return;
    }

    const newUser = new User(userData);
    this._user.set(newUser);
    this._state.set(AuthState.LOGGED_IN)
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('expirationTime', expirationTime.toString());
    return;
  }

  /**
   * Remove Stored User
   */
  signOut(): void {
    this._user.set(new User({ ...AnonymousUser }));
    this._state.set(AuthState.LOGGED_OUT);
    localStorage.removeItem('userData');
    localStorage.removeItem('expirationTime');
  }

  authStarted(): void {
    this.signOut();
    this._state.set(AuthState.STARTED);
  }

  get user(): Signal<User> {
    return computed(() => this._user());
  }

  get state(): Signal<AuthState> {
    return computed(() => this._state());
  }
}
