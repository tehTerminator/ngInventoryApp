import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, finalize } from 'rxjs';
import { User } from '../../../../../interface/user';
import { ApiService } from '../../../../../services/api/api.service';
import { NotificationsService } from '../../../../../services/notification/notification.service';
import { UserFormGroup } from './UserFormGroup';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  form = new UserFormGroup();
  private _loading = false;
  constructor(
    private api: ApiService,
    private notice: NotificationsService
  ) {}

  get loading(): boolean {
    return this._loading;
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this._loading = true;

    this.handleResponse(this.addNewUser(this.form.value));
  }

  private addNewUser(user: User) {
    return this.api.create<User>(['user'], user)
    .pipe(finalize(() => this._loading = false));
  }

  private handleResponse(response: Observable<User>): void {
    response.subscribe({
      next: (value) => {
        let message = `User ${value.name} Created.`;
        this.notice.show(message);
        this.form.reset();
      },
      error: () => {
        this.notice.show('Error Occurred');
      }
    })
  }
}

