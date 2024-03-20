import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../../../../../services/ledger/ledger.service';
import { Observable } from 'rxjs';
import { Ledger } from './../../../../../../interface/ledger.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { StatementFormGroup } from './StatementFormGroup';
import { StatementService } from '../../statement-service/statement.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form = new StatementFormGroup();

  constructor(
    private statementService: StatementService,
    private ledgerService: LedgerService) {}

  ngOnInit(): void {
    this.ledgerService.init();
  }


  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }


    this.statementService.fetchData(this.form.ledger, this.form.fromDate, this.form.toDate);
  }

  get ledgers(): Observable<Ledger[]> {
    return this.ledgerService.getAsObservable();
  }
}


