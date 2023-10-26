import { Component, OnDestroy, OnInit } from '@angular/core';
import { navItems } from './menu-items.data';
import { AuthStoreService } from './../../../services/auth-store/auth-store.service';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  items = navItems;
  private _sub = new Subscription();
  private _role = 'admin';
  constructor(private userStore: AuthStoreService) {}

  ngOnInit(): void {
    this._sub = this.userStore.user.subscribe({
      next: (value) => {
        try {
          this._role = value.role;
        } catch (e) {
          this._role = 'user'
        }
      }
    }); 
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  hasRole(role: string | undefined): boolean {
    if (role === undefined) {
      return true;
    }
    return role === this._role;
  }
}
