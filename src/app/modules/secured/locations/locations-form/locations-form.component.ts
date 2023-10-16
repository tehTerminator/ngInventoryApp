import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from './../../../../services/api/api.service';
import { LocationForm } from './LocationForm';
import { NotificationsService } from './../../../../services/notification/notification.service';
import { Location } from './../../../../interface/location';
import { Observable, Subscription, finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locations-form',
  templateUrl: './locations-form.component.html',
  styleUrls: ['./locations-form.component.scss'],
})
export class LocationsFormComponent implements OnInit, OnDestroy {
  form = new LocationForm();
  private _loading = false;
  private _sub = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private notice: NotificationsService
  ) {}

  ngOnInit(): void {
    this._sub = this.route.paramMap.subscribe({
      next: (value) => {
        const id = value.get('id');
        if (!!id) {
          this.populateForm(id);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  get editMode(): boolean {
    return this.form.id > 0;
  }

  get loading(): boolean {
    return this._loading;
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this._loading = true;

    if (this.editMode) {
      this.handleResponse(this.updateLocation(this.form.value));
      return;
    }

    this.handleResponse(this.addNewLocation(this.form.value));


  }

  private addNewLocation(location: Location) {
    return this.api.create<Location>(['location'], location)
    .pipe(finalize(() => this._loading = false));
  }

  private updateLocation(location: Location) {
    return this.api.update<Location>(['location'], location)
    .pipe(finalize(() => this._loading = false));
  }

  private handleResponse(response: Observable<Location>): void {
    response.subscribe({
      next: (value) => {
        let message = `Location ${value.title} Created.`;
        if (this.editMode) {
          message = `Location ${value.title} Updated`;
        }
        this.notice.show(message);
      },
      error: () => {
        this.notice.show('Error Occurred');
      }
    })
  }

  private populateForm(id: string) {
    this._loading = true;
    this.api
      .fetch_data<Location>(['get', 'location', id])
      .pipe(finalize(() => (this._loading = false)))
      .subscribe({
        next: (value) =>
          this.form.patchValue({
            id: value.id,
            title: value.title,
          }),
      });
  }
}
