import { Component } from '@angular/core';
import { navItems } from './menu-items.data';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  items = navItems;
  constructor() {}
}