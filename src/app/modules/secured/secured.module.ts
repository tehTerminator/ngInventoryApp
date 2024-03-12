import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuredRoutingModule } from './secured-routing.module';
import { SecuredComponent } from './secured.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    SecuredComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    SecuredRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
  ]
})
export class SecuredModule { }
