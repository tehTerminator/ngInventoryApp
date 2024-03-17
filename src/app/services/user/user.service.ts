import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { HOUR } from '../../shared/constants';
import { ApiService } from '../api/api.service';
import { NotificationsService } from '../notification/notification.service';
import { BaseService } from '../../class/BaseService';
import { User } from './../../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(private api: ApiService, private notification: NotificationsService) {
    super('users', HOUR);
  }

  protected fetch(): void {
    this.api.retrieve<User[]>(['get', 'users']).subscribe({
      next: (users) => {
        this.store(users);
      },
      error: (error) => {
        this._data.next([]);
        this.notification.show('An Error Occurred While Fetching Data');
        console.log(error);
      }
  });
  }

  create(user: User): Observable<User> {
    return this.api.create<User>(['user'], user)
      .pipe(
        tap(insertedUser => {
          this.insert(insertedUser);
        }),
        catchError(error => {
          console.log(error);
          throw new Error('Unable to Create New User');
        })
      );
  }

  update(user: User): Observable<User> {
    return this.api.update<User>(['user'], user)
      .pipe(tap(updatedUser => {
        this.updateItem(updatedUser);
      }));
  }

  delete(index: number): Observable<string> {
    try {
      const item = this.get(index);
      return this.api.delete<string>(this.table, item.id)
        .pipe(tap(() => {
          this.deleteItem(index);
        }));
    } catch (e) {
      this.notification.show('Item Does Not Exist');
      throw new Error('Item Not Found Error');
    }
  }

  updateBalance(id: number, opening?: number, closing?: number): Observable<any> {
    return this.api.create<User>('balance', {id, opening, closing})
    .pipe(
      tap(user => {
        this.updateItem(user);
      }),
      catchError(
        error => {
          console.error(error);
          throw new Error('Unable to Update Balance');
        }
      )
    );
  }

  public getElementByTitle(title: string): User {
    const list = this._data.value as User[];
    title = title.toLowerCase();
    if (list.length > 0) {
      const result = list.find(x => x.name.toLowerCase() === title);
      if (!!result) {
        return result;
      }
      throw new Error('Item Not Found');
    }
    throw new Error('List is Empty');
  }

  public isInstanceOfUser(data: any): data is User {
    return 'kind' in data;
  }
}
