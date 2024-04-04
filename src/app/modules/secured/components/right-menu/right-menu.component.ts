import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrl: './right-menu.component.scss',
})
export class RightMenuComponent {
  @Output() newClickEvent = new EventEmitter<any>();
  constructor(private authService: AuthenticationService) {}

  onOpenCalc() {
    this.newClickEvent.emit(0);
  }

  logout = () => this.authService.signOut();
}
