import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './../../directives/loading.directive';




@NgModule({
  declarations: [
    LoadingDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingDirective
  ]
})
export class CoreModule { }
