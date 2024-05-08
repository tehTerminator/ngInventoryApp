import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignLocationRoutingModule } from './assign-location-routing.module';
import { AssignLocationComponent } from './assign-location.component';
import { FormComponent } from './components/form/form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './../../standalone/product-list/product-list.component';

@NgModule({
  declarations: [AssignLocationComponent, FormComponent, UserListComponent],
  imports: [
    CommonModule,
    AssignLocationRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    ProductListComponent,
  ],
})
export class AssignLocationModule {}
