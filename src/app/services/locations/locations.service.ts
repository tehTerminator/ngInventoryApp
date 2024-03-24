import { Injectable } from '@angular/core';
import { StoreLocation } from '../../interface/location.interface';
import { BaseService } from './../../class/BaseService';
import { Observable, tap, catchError } from 'rxjs';
import { HOUR } from '../../shared/constants';
import { ApiService } from '../api/api.service';
import { NotificationsService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root'
})
export class LocationService extends BaseService<StoreLocation> {
    constructor(private api: ApiService, private notification: NotificationsService) {
        super('locations', HOUR);
      }
    
      protected fetch(): void {
        this.api.retrieve<StoreLocation[]>('locations').subscribe({
          next: (locations) => {
            this.store(locations);
            console.log('Locations Fetched');
          },
          error: (error) => {
            this._data.next([]);
            this.notification.show('An Error Occurred While Fetching Locations');
          }
      });
      }
    
      create(ledger: StoreLocation): Observable<StoreLocation> {
        return this.api.create<StoreLocation>(['ledger'], ledger)
          .pipe(
            tap(insertedLocation => {
              this.insert(insertedLocation);
            }),
            catchError(error => {
              console.log(error);
              throw new Error('Unable to Create New Location');
            })
          );
      }
    
      update(ledger: StoreLocation): Observable<StoreLocation> {
        return this.api.update<StoreLocation>(['ledger'], ledger)
          .pipe(tap(updatedLocation => {
            this.updateItem(updatedLocation);
          }));
      }
    
      delete(index: number): Observable<string> {
        try {
          const item = this.get(index);
          return this.api.delete<string>(this.table, item.id)
            .pipe(tap(() => {
              this.deleteItem(index);
            }));
        } catch (e) {
          this.notification.show('Item Does Not Exist');
          throw new Error('Item Not Found Error');
        }
      }
}