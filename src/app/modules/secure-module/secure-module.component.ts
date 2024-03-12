import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-secure-module',
  templateUrl: './secure-module.component.html',
  styleUrls: ['./secure-module.component.scss']
})
export class SecureModuleComponent {
  constructor(private authService: AuthenticationService) {}

  logout = () => this.authService.signOut();
}
