import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LedgerService } from '../../../../../../services/ledger/ledger.service';
import {
  EMPTY,
  Observable,
  Subject,
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
} from 'rxjs';
import { Ledger } from './../../../../../../interface/ledger.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { StatementFormGroup } from './StatementFormGroup';
import { StatementService } from '../../statement-service/statement.service';
import { getCurrentDateString } from '../../../../../../shared/functions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('firstInputField') input!: ElementRef<HTMLInputElement>;
  form = new StatementFormGroup();
  filteredLedgers: Observable<Ledger[]> = EMPTY;
  private _notifier$ = new Subject();

  constructor(
    private statementService: StatementService,
    private ledgerService: LedgerService
  ) {}

  ngOnInit(): void {
    this.ledgerService.init();
    const currentDate = getCurrentDateString();
    this.form.fromDateFormControl.setValue(currentDate);
    this.form.toDateFormControl.setValue(currentDate);

    this.filteredLedgers = this.form.ledgerFormControl.valueChanges.pipe(
      takeUntil(this._notifier$),
      startWith(''),
      distinctUntilChanged(),
      map((value) => {
        if (typeof value === 'string') {
          return this._filteredLedgers(value);
        }
        return this.ledgerService.getAsList() as Ledger[];
      })
    );
  }

  ngAfterViewInit(): void {
    if (this.input !== null) {
      this.input.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this._notifier$.next(null);
    this._notifier$.complete();
  }

  private _filteredLedgers(title: string): Ledger[] {
    const ledgers = this.ledgerService.getAsList() as Ledger[];
    let t = '';
    try {
      t = title.toLowerCase();
      return ledgers.filter((x) => x.title.toLowerCase().indexOf(t) >= 0);
    } catch (e) {
      return ledgers;
    }
  }

  public displayFunction(ledger: Ledger): string {
    return ledger && ledger.title ? ledger.title : '';
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    // console.log(this.form.value);

    this.statementService.fetchData(
      this.form.ledger,
      this.form.fromDate,
      this.form.toDate
    );
  }

  get ledgers(): Observable<Ledger[]> {
    return this.ledgerService.getAsObservable();
  }
}
