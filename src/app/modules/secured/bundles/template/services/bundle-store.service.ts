import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bundle } from './../../../../../interface/bundles';
import { ApiService } from './../../../../../services/api/api.service';

@Injectable()
export class BundleStoreService {
  private _bundle$ = new BehaviorSubject<Bundle>(EMPTY_BUNDLE);

  constructor(private api: ApiService) { }

  set id(id: number) {
    this.api.retrieve<Bundle>('bundle', {id: id.toString()})
    .subscribe({
      next: (data => this._bundle$.next(data)),
      error: (error => this._bundle$.next(EMPTY_BUNDLE))
    })
  }

  get bundle$(): BehaviorSubject<Bundle> {
    return this._bundle$;
  }
}

const EMPTY_BUNDLE: Bundle = {
  id: 0,
  title: 'Dummy Bundle',
  rate: 0,
  template: []
};
