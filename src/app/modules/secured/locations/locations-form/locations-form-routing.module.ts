import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsFormComponent } from './locations-form.component';

const routes: Routes = [{ path: '', component: LocationsFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsFormRoutingModule { }
