import { Component, effect, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'; // Import MatSort
import { DaybookRow, DayBookService } from './services/day-book.service';
import { Voucher } from '../../../../interface/voucher.interface';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.scss'],
  standalone: false
})
export class DaybookComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<DaybookRow>(); // Initialize MatTableDataSource
  displayedColumns: string[] = ['creditor', 'debtor', 'amount']; // Define columns for the table

  @ViewChild(MatSort) sort!: MatSort; // Reference to MatSort

  get loading(): boolean {
    return this.dayBookService.loading;
  }

  get length(): number {
    return this.dayBookService.vouchers().length;
  }

  constructor(private dayBookService: DayBookService) {
    effect(() => {
      this.dataSource.data = this.dayBookService.vouchers();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}