import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EMPTYLOCATION, StoreLocation } from './../../interface/location';
import { ApiService } from './../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MyLocationService {
  private _myLocations = new BehaviorSubject<StoreLocation[]>([]);
  private _selectedLocation = new BehaviorSubject<StoreLocation>(EMPTYLOCATION);
  private _init = false;

  constructor(private api: ApiService) { }

  retrieveData() {

    if (this._init) {
      return;
    }

    this.api.retrieve<StoreLocation[]>(['get', 'user', 'locations'])
    .subscribe({
      next: (value) => {
        this._myLocations.next(value);
        if(value.length >= 1) {
          this._selectedLocation.next(value[0]);
        }
        this._init = true;
      }
    });
  }

  set selectedLocation(value: StoreLocation) {
    this._selectedLocation.next(value);
  }

  get myLocations(): Observable<StoreLocation[]> {
    return this._myLocations;
  }

  get selectedLocation(): Observable<StoreLocation> {
    return this._selectedLocation;
  }

  get snapshot(): Snapshot {
    return {
      selected: this._selectedLocation.value,
      available: this._myLocations.value
    };
  }
}

interface Snapshot {
  selected: StoreLocation;
  available: StoreLocation[];
}
