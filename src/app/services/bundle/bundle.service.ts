import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { BaseService } from '../../class/BaseService';
import { HOUR } from '../../interface/collection.interface';
import { Bundle, BundleTemplate } from '../../interface/bundle.interface';
import { ApiService } from '../api/api.service';
import { NotificationsService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class BundleService extends BaseService<Bundle> {
  constructor(
    private api: ApiService,
    private notificationService: NotificationsService
  ) {
    super('bundle', HOUR);
  }

  protected fetch(): void {
    this.api.retrieve<Bundle[]>('bundles').subscribe({
      next: (bundles) => this.store(bundles),
      error: (error) => {
        this._data.next([]);
        this.notificationService.show('An Error Occurred While Fetching Data');
        console.log(error);
      },
    });
  }

  getTemplatesAsObservable(bundleId: number): Observable<BundleTemplate[]> {
    return this._data.pipe(
      map((x) => {
        const item = x.find((d) => d.id === bundleId) as Bundle;
        if (item === undefined) {
          return [];
        }
        return item.template;
      }),
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }

  create(bundle: Bundle): Observable<Bundle> {
    return this.api.create<Bundle>('bundle', bundle).pipe(
      tap((response) => this.insert(response)),
      catchError((e) => {
        console.log(e);
        throw new Error('Unable to Insert New Item to List');
      })
    );
  }

  update(bundle: Bundle): Observable<Bundle> {
    return this.api.update<Bundle>('bundle', bundle).pipe(
      tap((response) => this.updateItem(response)),
      catchError((error) => {
        console.log(error);
        throw new Error('Unable to Update Bundle');
      })
    );
  }

  delete(index: number): Observable<any> {
    try {
      const item = this.get(index);
      return this.api
        .delete([this.table], item.id)
        .pipe(tap(() => this.deleteItem(index)));
    } catch (e) {
      throw new Error('Item Not Found');
    }
  }

  createTemplate(id: number, template: BundleTemplate): Observable<BundleTemplate> {
    return this.api
      .create<BundleTemplate>(['bundle', id.toString(), 'template'], template)
      .pipe(
        tap((response) => {
          try {
            const bundle = this.getElementById(response.bundle_id) as Bundle;
            if (bundle.hasOwnProperty('templates')) {
              bundle.template.push(response);
            } else {
              bundle.template = [response];
            }
            this.updateItem(bundle);
          } catch (e) {
            console.log(e);
            throw new Error('Pos Item Not Found');
          }
        }),
        catchError((error) => {
          console.log(error);
          throw new Error('Unable to Create New Template');
        })
      );
  }

  deleteTemplate(template: BundleTemplate): Observable<any> {
    return this.api.delete('bundles__template', template.id).pipe(
      tap(() => {
        try {
          const bundle = this.getElementById(template.bundle_id) as Bundle;
          const indexOfItemToBeDeleted = this.findTemplateIndexById(
            bundle.id,
            template.id
          );
          bundle.template.splice(indexOfItemToBeDeleted, 1);
          this.updateItem(bundle);
        } catch (e) {
          throw new Error('Bundle Not Found');
        }
      }),
      catchError((error) => {
        console.log(error);
        throw new Error('Unable to Delete Template');
      })
    );
  }

  public isInstanceOfBundle(data: any): data is Bundle {
    return 'template' in data;
  }

  private findTemplateIndexById(bundleId: number, templateId: number): number {
    try {
      const item = this.getElementById(bundleId) as Bundle;
      return item.template.findIndex((x) => x.id === templateId);
    } catch (error) {
      throw new Error('Pos Item Not Found');
    }
  }
}
