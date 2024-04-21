import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { AuthStoreService } from '../../../../services/auth-store/auth-store.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrl: './right-menu.component.scss',
})
export class RightMenuComponent {
  @Output() newClickEvent = new EventEmitter<any>();
  constructor(
    private authService: AuthenticationService,
    private authStore: AuthStoreService
  ) {}

  onOpenCalc() {
    this.newClickEvent.emit(0);
  }

  logout = () => this.authService.signOut();

  get title() {
    return this.authStore.user.pipe(map((value) => value.name));
  }
}
