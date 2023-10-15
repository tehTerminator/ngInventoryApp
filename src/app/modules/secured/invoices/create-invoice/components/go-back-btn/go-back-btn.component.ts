import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back-btn',
  templateUrl: './go-back-btn.component.html',
  styleUrls: ['./go-back-btn.component.css'],
})
export class GoBackBtnComponent {
  constructor(private router: Router) {}

  goBack(): void {
    const path = this.generateRoute();
    this.router.navigate(path);
  }

  get currentPath(): string[] {
    return this.router.url.split('/').filter(segment => !!segment);
  }

  private generateRoute(): string[] {
    const path = this.currentPath.slice();

    if (path.length < 5 || path[2] !== 'create') {
      return [];
    }

    switch (path[4]) {
      case 'create-transactions':
      case 'payment-method':
        path[4] = 'select-product';
        break;
      default:
        path[4] = 'select-contact';
        break;
    }

    return path;
  }

  showBtn(): boolean {
    if (this.currentPath.length < 3 || this.currentPath[2] !== 'create' || this.currentPath[4] === 'select-contact') {
      return false;
    }
    return true;
  }
}
