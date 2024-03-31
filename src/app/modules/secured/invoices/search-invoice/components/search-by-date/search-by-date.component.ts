import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { SearchInvoiceStoreService } from '../../search-store/search-store.service';
import { UserStoreService } from '../../../../../../services/user/user.service';
import { NotificationsService } from '../../../../../../services/notification/notification.service';
import { finalize } from 'rxjs';
import { getCurrentDateString } from '../../../../../../shared/functions';

@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styleUrls: ['./search-by-date.component.scss'],
})
export class SearchByDateComponent {
  searchFormGroup = new SearchFormGroup();
  loading = false;

  ngOnInit(): void {
    this.userStore.init();
    const currentDate = getCurrentDateString();
    this.searchFormGroup.createdAtFC.setValue(currentDate);
  }

  onSubmit(): void {
    if (this.searchFormGroup.invalid) {
      this.notification.show('Invalid Form Data');
      return;
    }

    this.loading = true;

    this.store.fetchUsingUserId(this.searchFormGroup.createdAt, this.searchFormGroup.userId)
    .pipe(finalize(() => this.loading = false))
    .subscribe({next: (value => console.log(value))});



  }

  get users$() {
    return this.userStore.getAsObservable();
  }

  constructor(
    private notification: NotificationsService,
    private userStore: UserStoreService,
    private store: SearchInvoiceStoreService
  ) {}
}

export class SearchFormGroup extends FormGroup {
  constructor() {
    super({
      createdAt: new FormControl<string>('', [Validators.required]),
      userId: new FormControl<number>(0, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  get createdAtFC(): FormControl<string> {
    return this.get('createdAt') as FormControl<string>;
  }

  get userIdFC(): FormControl<number> {
    return this.get('userId') as FormControl<number>;
  }

  get createdAt(): string {
    return this.createdAtFC.value;
  }

  get userId(): number {
    return this.userIdFC.value;
  }
}
