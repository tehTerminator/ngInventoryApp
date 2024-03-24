import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { StoreLocation } from './../../../../interface/location.interface';
import { ApiService } from '../../../../services/api/api.service';
import { LocationService } from '../../../../services/locations/locations.service';

@Component({
  selector: 'app-locations-table',
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.scss']
})
export class LocationsTableComponent implements OnInit {
  private _loading = false;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.init();
  }

  get locations(): Observable<StoreLocation[]> {
    return this.locationService.getAsObservable();
  }

  get loading(): boolean {
    return this._loading;
  }
}
