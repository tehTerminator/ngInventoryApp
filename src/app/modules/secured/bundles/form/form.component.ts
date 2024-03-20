import { Component } from '@angular/core';
import { BundleFormGroup } from './BundleFormGroup';
import { ApiService } from './../../../../services/api/api.service';
import { NotificationsService }  from './../../../../services/notification/notification.service';
import { Bundle } from './../../../../interface/bundle.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BundleService } from '../../../../services/bundle/bundle.service';

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

    const payload: Bundle = this.bundleFormGroup.value;

    if (this.bundleFormGroup.editMode) {
      this.handleResponse(this.bundleService.update(payload));
    } else {
      this.handleResponse(this.bundleService.create(payload));
    }
  }

  private handleResponse(response: Observable<any>)
  {
    response.subscribe({
      next: ((data) => {
        this.router.navigate(['/auth', 'bundles', data.id, 'template']);
      }),
      error: ((error) => this.notification.show(error))
    })
  }

  constructor(
    private router: Router,
    private bundleService: BundleService,
    private notification: NotificationsService) {}
}

