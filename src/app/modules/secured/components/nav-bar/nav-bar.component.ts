import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navItems } from './menu-items.data';
import { AuthStoreService } from './../../../../services/auth-store/auth-store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  items = navItems;
  private _role = 'admin';
  constructor(private userStore: AuthStoreService) {}

  ngOnInit(): void {
    this._role = this.userStore.userData.role;
  }

  hasRole(role: string | undefined): boolean {
    if (role === undefined) {
      return true;
    }
    return role === this._role;
  }
}
