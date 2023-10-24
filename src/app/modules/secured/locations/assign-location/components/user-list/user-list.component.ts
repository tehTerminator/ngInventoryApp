import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../../../interface/user';
import { ApiService } from '../../../../../../services/api/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnChanges {
  @Input('location') location = 0;
  private _user = new BehaviorSubject<User[]>([])

  private loadUser(): void {
    this.api.fetch_data<User[]>(['get', 'location', 'users'], {id: this.location.toString()})
    .subscribe({
      next: (value) => this._user.next(value)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'].currentValue !==  changes['location'].previousValue) {
      // If locationId changes and it's not the initial change, load the users
      this.loadUser();
    }
  }

  get users(): Observable<User[]> {
    return this._user.asObservable();
  }

  constructor(
    private api: ApiService
  ) {}
}
