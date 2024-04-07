import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navigation-btn',
  templateUrl: './navigation-btn.component.html',
  styleUrls: ['./navigation-btn.component.scss'],
})
export class NavigationBtnComponent implements AfterViewInit, OnDestroy {
  private paths = [
    'select-contact',
    'select-product',
    'create-transactions',
    'set-discount',
    'choose-payment-method',
  ];

  constructor(private router: Router) {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

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
}
