import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyLocationStoreService } from '../../../services/myLocation/my-location.service';
import { EMPTYLOCATION, StoreLocation } from '../../../interface/location.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _myLocation = EMPTYLOCATION;
  private _sub = new Subscription();
  constructor(private myLocationStore: MyLocationStoreService) {}

  ngOnInit(): void {
    this.myLocationStore.retrieveData();
    this._sub = this.myLocationStore.selectedLocation.subscribe({
      next: (value) => (this._myLocation = value),
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  get myLocation(): StoreLocation {
    if(!!this._myLocation) {
      return this._myLocation;
    }
    return EMPTYLOCATION;
  }
}
