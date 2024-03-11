import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs';
import { UserData } from '../authentication/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    const authUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      environment.firebaseConfig.apiKey;
    return this.http.post<UserData>(authUrl, { email, password, returnSecureToken: true });
  }

  get(itemType: string) {
    return this.http.get(this.createUrl(itemType));
  }

  post(itemType: string, data: any) {
    return this.http.post(this.createUrl(itemType), data);
  }

  private createUrl(tail: string): string {
    return `${environment.firebaseConfig.databaseURL}\\${tail}.json`;
  }
}
