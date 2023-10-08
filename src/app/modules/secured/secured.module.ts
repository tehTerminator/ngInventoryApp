import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

import { SecuredRoutingModule } from './secured-routing.module';
import { SecuredComponent } from './secured.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    SecuredComponent,
    NavBarComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    SecuredRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule
  ]
})
export class SecuredModule { }
