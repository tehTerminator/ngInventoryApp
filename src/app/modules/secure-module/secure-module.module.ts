import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureModuleRoutingModule } from './secure-module-routing.module';
import { SecureModuleComponent } from './secure-module.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    SecureModuleComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    SecureModuleRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
  ]
})
export class SecureModuleModule { }
