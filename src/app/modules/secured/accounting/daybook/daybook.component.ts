import { Component } from '@angular/core';
import { DayBookService } from './services/day-book.service';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.scss'],
})
export class DaybookComponent {
  dataToDisplay: Rows[] = [
    {
      creditor: 'BANK,WALLET,CASH',
      debtor: 'RECEIVABLE',
      title: 'Online Payments',
    },
    {
      creditor: 'RECEIVABLE',
      debtor: 'BANK,WALLET,CASH',
      title: 'Receipts',
    },
    {
      creditor: 'BANK,WALLET,CASH',
      debtor: 'BANK,WALLET',
      title: 'Contra',
    },
    {
      creditor: 'CASH',
      debtor: 'CASH',
      title: 'Cash to Cash',
    },
    {
      creditor: 'BANK,WALLET,CASH',
      debtor: 'EXPENSE,PURCHASE AC',
      title: 'EXPENSES',
    },
    {
      creditor: 'INCOME,SALES AC',
      debtor: 'BANK,WALLET,CASH,RECEIVABLE,PAYABLE',
      title: 'INCOME',
    },
    {
      creditor: 'BANK,WALLET,CASH',
      debtor: 'PAYABLE',
      title: 'To Payable',
    },
    {
      creditor: 'PAYABLE',
      debtor: 'BANK,WALLET,CASH',
      title: 'From Payable',
    },
  ];

  get loading(): boolean {
    return this.dayBookService.loading;
  }

  get length(): number {
    return this.dayBookService.dayBook.value.length;
  }

  constructor(private dayBookService: DayBookService) {}
}

interface Rows {
  creditor: string;
  debtor: string;
  title: string;
}
