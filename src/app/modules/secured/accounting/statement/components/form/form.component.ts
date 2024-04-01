import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../../../../../services/ledger/ledger.service';
import { Observable } from 'rxjs';
import { Ledger } from './../../../../../../interface/ledger.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { StatementFormGroup } from './StatementFormGroup';
import { StatementService } from '../../statement-service/statement.service';
import { getCurrentDateString } from '../../../../../../shared/functions';

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
    const currentDate = getCurrentDateString();
    this.form.fromDateFormControl.setValue(currentDate);
    this.form.toDateFormControl.setValue(currentDate);
  }


  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    // console.log(this.form.value);
    
    const ledger = this.ledgerService.getElementById(+this.form.ledger);

    this.statementService.fetchData(ledger, this.form.fromDate, this.form.toDate);
  }

  get ledgers(): Observable<Ledger[]> {
    return this.ledgerService.getAsObservable();
  }
}


