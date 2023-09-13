import { Injectable } from '@angular/core';
import { User } from './user.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _user: User | null;

  constructor(private api: ApiService) { }

  isLoggedIn(): boolean {
    if (this._user === null) {
      return false;
    }

    if (this._user.token === null) {
      return false;
    }

    return true;
  }

  authenticate(username: string, password: string) {
    this.api.fetch_data(['user', 'authenticate'], {username, password})
  }
  
}
