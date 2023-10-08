import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './../../directives/loading.directive';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoadingDirective
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,  
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  exports: [
    LoadingDirective,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,  
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class CoreModule { }
