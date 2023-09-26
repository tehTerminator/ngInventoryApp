import { Component } from '@angular/core';

import { AuthenticationService } from './../../services/authentication/authentication.service';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.scss']
})
export class SecuredComponent {
  constructor(private authService: AuthenticationService) {}

  logout = () => this.authService.signOut();
}
