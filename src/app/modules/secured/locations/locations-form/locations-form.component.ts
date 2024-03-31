import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from './../../../../services/api/api.service';
import { LocationForm } from './LocationForm';
import { NotificationsService } from './../../../../services/notification/notification.service';
import { StoreLocation } from './../../../../interface/location.interface';
import { Observable, Subscription, finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../../../services/locations/locations.service';

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
    private notice: NotificationsService,
    private locationStore: LocationService,
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

  private addNewLocation(location: StoreLocation) {
    return this.locationStore.create(location)
    .pipe(finalize(() => this._loading = false));
  }

  private updateLocation(location: StoreLocation) {
    return this.locationStore.update(location)
    .pipe(finalize(() => this._loading = false));
  }

  private handleResponse(response: Observable<StoreLocation>): void {
    response.subscribe({
      next: (value) => {
        let message = `StoreLocation ${value.title} Created.`;
        if (this.editMode) {
          message = `StoreLocation ${value.title} Updated`;
        }
        this.notice.show(message);
        this.form.reset();
      },
      error: () => {
        this.notice.show('Error Occurred');
      }
    })
  }

  private populateForm(id: string) {
    this._loading = true;
    try {
      const location = this.locationStore.getElementById(parseInt(id));
      this.form.patchValue({
        id: location.id,
        title: location.title
      });
    } catch (e) {
      this.notice.show('No Location # ' + id + ' found');
      this.form.reset();
    }
  }
}
