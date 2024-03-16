import { Component } from '@angular/core';
import { BundleFormGroup } from './BundleFormGroup';
import { ApiService } from './../../../../services/api/api.service';
import { NotificationsService }  from './../../../../services/notification/notification.service';
import { Bundle } from './../../../../interface/bundles';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  private _loading = false;
  bundleFormGroup = new BundleFormGroup();

  get loading(): boolean {
    return this._loading;
  }

  onSubmit() {
    if (this.bundleFormGroup.invalid) {
      this.notification.show('Invalid Form Data');
      return;
    }

    const payload = this.bundleFormGroup.value;
    let reponse: Observable<Bundle>;

    if (this.bundleFormGroup.editMode) {
      this.handleResponse(this.api.update<Bundle>('bundle', payload));
    } else {
      this.handleResponse(this.api.create<Bundle>('bundle', payload));
    }
  }

  private handleResponse(response: Observable<any>)
  {
    response.subscribe({
      next: ((data) => {
        this.router.navigate(['/auth', 'bundles', data.id, 'templates']);
      }),
      error: ((error) => this.notification.show(error))
    })
  }

  constructor(
    private router: Router,
    private api: ApiService, 
    private notification: NotificationsService) {}
}

