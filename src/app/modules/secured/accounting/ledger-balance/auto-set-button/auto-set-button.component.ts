import { Component } from '@angular/core';
import { LedgerBalanceService } from './../ledger-balance.service';


@Component({
  selector: 'app-auto-set-button',
  templateUrl: './auto-set-button.component.html',
  styleUrl: './auto-set-button.component.scss',
})
export class AutoSetButtonComponent {
  updateBalance(): void {}
  
  constructor(private store: LedgerBalanceService) {}
}
