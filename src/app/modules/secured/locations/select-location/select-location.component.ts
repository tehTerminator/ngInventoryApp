import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyLocationStoreService } from '../../../../services/myLocation/my-location.service';
import { Observable, Subscription } from 'rxjs';
import { EMPTYLOCATION, StoreLocation } from '../../../../interface/location.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss']
})
export class SelectLocationComponent implements OnInit, OnDestroy {
  private _selectedLocation = EMPTYLOCATION;
  private _sub = new Subscription();
  selectLocationControl = new FormControl(null);
  constructor(private myLocationStore: MyLocationStoreService) {}

  ngOnInit(): void {
    this._sub = this.myLocationStore.selectedLocation.subscribe({
      next: (value) => {
        console.log('Selected Location', value);
        this._selectedLocation = value
      }
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  onSubmit(): void {
    const location = this.selectLocationControl.value;
    
    if( location !== null) {
      this.myLocationStore.selectedLocation = location;
    }
  }

  get myLocations(): Observable<StoreLocation[]> {
    return this.myLocationStore.availableLocations;
  }

  get selectedLocation(): StoreLocation {
    return this._selectedLocation;
  }
}
