import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, EMPTY, startWith, map, distinctUntilChanged } from 'rxjs';
import { Ledger } from './../../../../interface/ledger.interface';
import { ApiService } from '../../../../services/api/api.service';
import { LedgerService } from '../../../../services/ledger/ledger.service';
import { NotificationsService } from '../../../../services/notification/notification.service';
import { Voucher } from '../../../../interface/voucher.interface';
import { evaluateString } from '../../../../shared/functions';
import { VoucherFormGroup } from './VoucherFormGroup';

@Component({
  selector: 'app-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.scss'],
})
export class VoucherFormComponent implements OnInit, AfterViewInit {
  @ViewChild('firstInputField') input!: ElementRef<HTMLInputElement>;
  voucherForm = new VoucherFormGroup();
  isLoading = false;
  filteredCreditor: Observable<Ledger[]> = EMPTY;
  filteredDebtor: Observable<Ledger[]> = EMPTY;

  constructor(
    private api: ApiService,
    private ns: NotificationsService,
    private ledgerService: LedgerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ledgerService.init();
    this.filteredCreditor = this.voucherForm.crFormControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      map((value) => {
        if (typeof value === 'string') {
          return this.filteredOptions(value, 'EXPENSE');
        }
        return this.ledgerService.getAsList() as Ledger[];
      })
    );

    this.filteredDebtor = this.voucherForm.drFormControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      map((value) => {
        if (typeof value === 'string') {
          return this.filteredOptions(value, 'INCOME');
        }
        return this.ledgerService.getAsList() as Ledger[];
      })
    );

    this.loadIdFromRoute();
  }

  ngAfterViewInit(): void {
    if (this.input !== null) {
      this.input.nativeElement.focus();
    }
  }

  private loadIdFromRoute(): void {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.voucherForm.id = id;
      this.onIdFieldChange();
    } catch (e) {
      this.voucherForm.id = 0;
    }
  }

  onIdFieldChange(): void {
    this.isLoading = true;
    if (this.voucherForm.id > 0) {
      this.api
        .retrieve<Voucher>(['voucher', this.voucherForm.id.toString()])
        .subscribe({
          next: (voucher) => {
            this.isLoading = false;
            this.updateFormData(voucher);
          },
          error: () => {
            this.isLoading = false;
            this.ns.show('Given Voucher Not Found');
            this.voucherForm.reset();
          },
        });
    } else {
      this.isLoading = false;
    }
  }

  private updateFormData(voucher: Voucher): void {
    try {
      const cr = this.ledgerService.getElementById(voucher.cr);
      const dr = this.ledgerService.getElementById(voucher.dr);
      console.log({
        cr,
        dr,
        narration: voucher.narration,
        amount: voucher.amount,
      });
      this.voucherForm.patchValue({
        cr,
        dr,
        narration: voucher.narration,
        amount: voucher.amount,
      });
    } catch (e) {
      this.ns.show('Error Loading Data From Server');
    }
  }

  onAmountFieldFocus(): void {
    // alert('Focused');
    try {
      const value = evaluateString(this.voucherForm.narrationFormControl.value);
      this.voucherForm.amount = value;
    } catch (e) {
      this.voucherForm.amount = 0;
    }
  }

  onSubmit(): void {
    if (this.voucherForm.invalid) {
      this.ns.show('There are some Errors in Your Form');
      return;
    }

    if (this.voucherForm.cr.id === this.voucherForm.dr.id) {
      this.ns.show('Giver and Receiver Cannot Be Same');
      return;
    }

    this.isLoading = true;

    const payload = this.voucherForm.value;
    payload.cr = payload.cr.id;
    payload.dr = payload.dr.id;
    let response = EMPTY;

    console.log('payload: ', payload);
    console.log('Voucher Form Value', this.voucherForm.value);
    if (this.voucherForm.editMode) {
      response = this.api.update(['voucher'], payload);
    } else {
      response = this.api.create(['voucher'], payload);
    }

    this.handleResponse(response);
  }

  private handleResponse(response: Observable<Voucher>): void {
    const word = this.voucherForm.editMode ? 'Updated' : 'Created';
    const successMessage = `Voucher ${word} successfully`;

    response.subscribe({
      next: () => {
        this.ns.show(successMessage);
        this.voucherForm.reset();
        this.isLoading = false;
        this.input.nativeElement.focus();
      },
      error: (error) => {
        this.ns.show(error);
        this.isLoading = false;
      },
    });
  }

  get ledgers(): Observable<Ledger[]> {
    return this.ledgerService.getAsObservable() as Observable<Ledger[]>;
  }

  public filteredOptions(title: string, kindIsNot: string): Ledger[] {
    const ledgers = this.ledgerService.getAsList() as Ledger[];
    let t = '';
    try {
      t = title.toLowerCase();
      return ledgers.filter(
        (x) => x.kind !== kindIsNot && x.title.toLowerCase().indexOf(t) >= 0
      );
    } catch (e) {
      return ledgers.filter((x) => x.kind !== kindIsNot);
    }
  }

  public displayFunction(ledger: Ledger): string {
    return ledger && ledger.title ? `${ledger.title} - ${ledger.kind}` : '';
  }
}
