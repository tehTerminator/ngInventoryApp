import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaybookRoutingModule } from './daybook-routing.module';
import { DaybookComponent } from './daybook.component';
import { DayBookFormComponent } from './components/day-book-form/day-book-form.component';
import { DayBookTableComponent } from './components/day-book-table/day-book-table.component';
import { DayBookService } from './services/day-book.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DaybookComponent, DayBookFormComponent, DayBookTableComponent],
  imports: [CommonModule, DaybookRoutingModule, ReactiveFormsModule],
  providers: [DayBookService],
})
export class DaybookModule {}
