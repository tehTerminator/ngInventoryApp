import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaybookRoutingModule } from './daybook-routing.module';
import { DaybookComponent } from './daybook.component';
import { DayBookFormComponent } from './components/day-book-form/day-book-form.component';
import { DayBookService } from './services/day-book.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [DaybookComponent, DayBookFormComponent],
  imports: [
    CommonModule,
    DaybookRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [DayBookService],
})
export class DaybookModule {}
