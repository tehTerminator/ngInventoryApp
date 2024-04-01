import { Component } from '@angular/core';
import { LedgerBalanceService } from './../ledger-balance.service';
import { SECOND } from '../../../../../shared/constants';


@Component({
  selector: 'app-auto-set-button',
  templateUrl: './auto-set-button.component.html',
  styleUrl: './auto-set-button.component.scss',
})
export class AutoSetButtonComponent {
  timer = 0;

  updateBalance = () => {
    this.timer = 10;
    this.store.autoSetBalance();
    const interval = setInterval(() => {
      if ( this.timer === 0) {
        clearInterval(interval);
      } else {
        this.timer -= 1
      }
    }, SECOND);
  }
  constructor(private store: LedgerBalanceService) {}
}
