import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectLocationComponent } from './select-location.component';

const routes: Routes = [{ path: '', component: SelectLocationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectLocationRoutingModule { }
