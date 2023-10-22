import { Component } from '@angular/core';
import { LedgerService } from '../../../../../../services/ledger/ledger.service';
import { Observable } from 'rxjs';
import { Ledger } from '../../../../../../interface/ledger';

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.scss']
})
export class LedgerListComponent {
  constructor(private ledgerService: LedgerService) {}

  get ledgers(): Observable<Ledger[]> {
    return this.ledgerService.getAsObservable();
  }
}
