import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStoreService } from '../../../services/auth-store/auth-store.service';
import { navItems } from './menu-items.data';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  items = navItems;
  // private _sub = new Subscription();
  // private _role = 'admin';
  constructor(private userStore: AuthStoreService) {}

  ngOnInit(): void {
    // this._role = this.userStore.userData.role;
  }

  ngOnDestroy(): void {
    // this._sub.unsubscribe();
    console.log('Destroyed');
  }

  // hasRole(role: string | undefined): boolean {
  //   if (role === undefined) {
  //     return true;
  //   }
  //   return role === this._role;
  // }
}
