import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';
import { LocationService } from '../../services/locations/locations.service';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.scss']
})
export class SecuredComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.userService.init();
    this.locationService.init();
  }

  logout = () => this.authService.signOut();
}
