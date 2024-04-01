import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  EMPTYLOCATION,
  StoreLocation,
} from '../../interface/location.interface';
import { ApiService } from './../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class MyLocationStoreService {
  private _availableLocations = new BehaviorSubject<StoreLocation[]>([]);
  private _selectedLocation = new BehaviorSubject<StoreLocation>(EMPTYLOCATION);
  private _init = false;

  constructor(private api: ApiService) {}

  retrieveData() {
    if (this._init) {
      console.log('Alread Initializeed');
      return;
    }

    const selectedLocationData = localStorage.getItem('selectedLocation');
    if (!!selectedLocationData) {
      const selectedLocation = JSON.parse(
        selectedLocationData
      ) as StoreLocation;
      this.selectedLocation = selectedLocation;
    }

    this.api.retrieve<StoreLocation[]>(['user', 'locations']).subscribe({
      next: (value) => {
        this._availableLocations.next(value);
        if (this.snapshot.selected === EMPTYLOCATION) {
          this._selectedLocation.next(value[0]);
        }
        this._init = true;
      },
    });
  }

  set selectedLocation(value: StoreLocation) {
    localStorage.setItem('selectedLocation', JSON.stringify(value));
    this._selectedLocation.next(value);
  }

  get availableLocations(): Observable<StoreLocation[]> {
    return this._availableLocations;
  }

  get selectedLocation(): Observable<StoreLocation> {
    return this._selectedLocation;
  }

  get snapshot(): Snapshot {
    return {
      selected: this._selectedLocation.value,
      available: this._availableLocations.value,
    };
  }
}

interface Snapshot {
  selected: StoreLocation;
  available: StoreLocation[];
}
