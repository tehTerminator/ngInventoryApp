import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyLocationService } from '../../../services/myLocation/my-location.service';
import { EMPTYLOCATION, StoreLocation } from '../../../interface/location';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _myLocation = EMPTYLOCATION;
  private _sub = new Subscription();
  constructor(private myLocationStore: MyLocationService) {}

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
    return this._myLocation;
  }
}
