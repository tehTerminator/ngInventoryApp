import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navigation-btn',
  templateUrl: './navigation-btn.component.html',
  styleUrls: ['./navigation-btn.component.scss'],
})
export class NavigationBtnComponent implements AfterViewInit, OnDestroy {
  private paths = [
    'select-contact',
    'select-product',
    'set-discount',
    'choose-payment-method',
  ];

  private _notifier$ = new Subject();

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.router.events.pipe(takeUntil(this._notifier$)).subscribe((val) => {
      if (this.isPurchase()) {
        this.paths = [
          'select-contact',
          'select-product',
          'choose-payment-method',
        ];
      } else {
        this.paths = [
          'select-contact',
          'select-product',
          'set-discount',
          'choose-payment-method',
        ];
      }
    });
  }

  ngOnDestroy(): void {
    this._notifier$.next(0);
    this._notifier$.complete();
  }

  goBack(): void {
    const path = this.currentPath;
    if (this.currentPathIndex <= 0) {
      return;
    }

    path[4] = this.paths[this.currentPathIndex - 1];
    this.router.navigate(path);
  }

  goForward(): void {
    const path = this.currentPath;
    if (this.currentPathIndex >= 4) {
      return;
    }

    path[4] = this.paths[this.currentPathIndex + 1];
    this.router.navigate(path);
  }

  get currentPath(): string[] {
    return this.router.url.split('/').filter((segment) => !!segment);
  }

  get currentPathIndex(): number {
    return this.paths.indexOf(this.currentPath[4]);
  }

  showBtn(): boolean {
    if (
      this.currentPath.length < 3 ||
      this.currentPath[2] !== 'create' ||
      this.currentPath[4] === 'select-contact'
    ) {
      return false;
    }
    return true;
  }

  isPurchase(): boolean {
    return this.currentPath[3] === 'purchase';
  }
}
