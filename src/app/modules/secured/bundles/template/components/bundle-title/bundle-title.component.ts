import { Component, OnDestroy, OnInit } from '@angular/core';
import { BundleStoreService } from '../../services/bundle-store.service';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { Bundle } from '../../../../../../interface/bundle.interface';

@Component({
  selector: 'app-bundle-title',
  templateUrl: './bundle-title.component.html',
  styleUrl: './bundle-title.component.scss'
})
export class BundleTitleComponent implements OnInit, OnDestroy {
  title = '';
  private sub: Subscription = new Subscription();
  constructor(private _store: BundleStoreService) {}

  get bundle(): Observable<Bundle> {
    return this._store.bundle$;
  }

  ngOnInit(): void {
    this.sub = this._store.bundle$.subscribe({
      next: (data => this.title = data.title)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
