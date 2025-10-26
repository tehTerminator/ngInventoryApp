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
import { MatCardModule } from '@angular/material/card';

/**
 * CoreModule is a shared module that imports and exports common Angular Material components
 * and directives used throughout the application.
 *
 * @module CoreModule
 * @description
 * This module contains commonly used Angular Material components and custom directives.
 * It is designed to be imported into other feature modules to avoid code duplication.
 *
 * @example
 * import { CoreModule } from './core/core.module';
 *
 * @NgModule({
 *   imports: [CoreModule],
 * })
 * export class SomeFeatureModule {}
 */
@NgModule({
  declarations: [LoadingDirective],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,  
    MatTabsModule,
    MatCardModule,
  ],
  exports: [
    LoadingDirective,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
  ],
})
export class CoreModule {}
