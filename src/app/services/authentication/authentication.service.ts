import { Injectable, OnDestroy } from '@angular/core';
import { AnonymousUser, User, UserData } from './user.model';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { AuthStoreService } from '../auth-store/auth-store.service';
import { Observable, catchError, tap } from 'rxjs';
import { HOUR } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnDestroy {
  private timer: any = null;

  constructor(
    private api: ApiService,
    private authStore: AuthStoreService,
    private router: Router
  ) {}

  init(): void {
    const userData: UserData = this.getStoredUserData();
    const expirationTime = this.getStoredExpirationTime();
    const currentTime = new Date().getTime();

    if (expirationTime > currentTime && userData.id > 0) {
      this.handleAuthentication(userData);
    }
  }

  authenticate(username: string, password: string): Observable<any> {
    this.authStore.authStarted();

    return this.api
      .fetch_data<UserData>(['user', 'auth'], { username, password })
      .pipe(
        tap((userData) => {
          this.handleAuthentication(userData);
        }),
        catchError(() => {
          this.authStore.signOut();
          throw new Error('Invalid Username or Password');
        })
      );
  }

  signOut(): void {
    this.authStore.signOut();
    localStorage.removeItem('userData');
    localStorage.removeItem('expirationTime');
    this.router.navigate(['']);
  }

  private handleAuthentication(userData: UserData): void {
    const expirationTime = new Date(userData.updated_at).getTime() + HOUR;
    this.setAutoSignOut(expirationTime);
    this.authStore.signIn(userData, expirationTime);
    this.storeInLocalStorage(userData, expirationTime);
  }

  private storeInLocalStorage(
    userData: UserData,
    expirationTime: number
  ): void {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('expirationTime', expirationTime.toString());
  }

  private getStoredUserData(): UserData {
    const ud = localStorage.getItem('userData');
    let userData: UserData = { ...AnonymousUser };
    if (!!ud) {
      userData = JSON.parse(ud) as UserData;
    }
    return userData;
  }

  private getStoredExpirationTime(): number {
    const storedExpirationTime = localStorage.getItem('expirationTime');
    return storedExpirationTime ? parseInt(storedExpirationTime, 10) : 0;
  }

  private setAutoSignOut(expirationTime: number): void {
    const currentTime = new Date().getTime();
    const timeDiff = expirationTime - currentTime;
    if (timeDiff > 0) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.signOut();
      }, timeDiff);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
