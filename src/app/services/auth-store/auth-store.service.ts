import { computed, effect, Injectable, signal } from '@angular/core';
import { AuthState } from './../../interface/auth-state';
import { AnonymousUser, User, UserData } from './../authentication/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  #state = signal(AuthState.LOGGED_OUT);
  #user = signal(new User({...AnonymousUser}));
  state = computed(this.#state);
  user = computed(this.#user);

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
      this.#state.set(AuthState.LOGGED_OUT);
      return;
    }

    if (userData.id <= 0) {
      this.#state.set(AuthState.LOGGED_OUT);
      return;
    }

    const newUser = new User(userData);
    this.#user.set(newUser);
    this.#state.set(AuthState.LOGGED_IN)
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('expirationTime', expirationTime.toString());
    return;
  }

  /**
   * Remove Stored User
   */
  signOut(): void {
    this.#user.set(new User({ ...AnonymousUser }));
    this.#state.set(AuthState.LOGGED_OUT);
    localStorage.removeItem('userData');
    localStorage.removeItem('expirationTime');
  }

  authStarted(): void {
    this.signOut();
    this.#state.set(AuthState.STARTED);
  }
}
