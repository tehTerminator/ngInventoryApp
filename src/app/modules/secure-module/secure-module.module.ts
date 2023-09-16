import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureModuleRoutingModule } from './secure-module-routing.module';
import { SecureModuleComponent } from './secure-module.component';


@NgModule({
  declarations: [
    SecureModuleComponent
  ],
  imports: [
    CommonModule,
    SecureModuleRoutingModule
  ]
})
export class SecureModuleModule { }
