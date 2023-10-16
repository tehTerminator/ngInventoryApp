import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { Location } from './../../../../interface/location';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'app-locations-table',
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.scss']
})
export class LocationsTableComponent implements OnInit {
  private _locations = new BehaviorSubject<Location[]>([]);
  private _loading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this._loading = true;
    this.api.fetch_data<Location[]>(['get', 'locations'])
    .pipe(finalize(() => this._loading = false))
    .subscribe({
      next: (value) => this._locations.next(value),
      error: () => this._locations.next([])
    });
  }

  get locations(): Observable<Location[]> {
    return this._locations;
  }
}
