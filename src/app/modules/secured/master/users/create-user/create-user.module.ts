import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserRoutingModule } from './create-user-routing.module';
import { CreateUserComponent } from './create-user.component';
import { CoreModule } from './../../../../core/core.module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    CreateUserRoutingModule,
    CoreModule,
    MatCardModule
  ]
})
export class CreateUserModule { }
