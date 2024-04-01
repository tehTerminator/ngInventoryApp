import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ledger-balance',
  template: `
    <div class="row">
        <div class="col-md-4">
            <app-ledger-balance-form></app-ledger-balance-form>
            <app-auto-set-button></app-auto-set-button>
        </div>
        <div class="col-md-8">
            <app-ledger-balance-list></app-ledger-balance-list>
        </div>
    </div>
  `,
  styles: ['']
})
export class LedgerBalanceComponent {
  constructor() {}
}