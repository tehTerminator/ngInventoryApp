import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureModuleComponent } from './secure-module.component';

const routes: Routes = [{ path: '', component: SecureModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureModuleRoutingModule { }
