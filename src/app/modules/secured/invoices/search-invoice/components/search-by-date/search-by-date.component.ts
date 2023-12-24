import { Component } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { retry } from 'rxjs';
import { ApiService } from '../../../../../../services/api/api.service';
import { SearchInvoiceStoreService } from '../../search-store/search-store.service';
import { getCurrentDateString } from '../../../../../../shared/functions';

@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styleUrls: ['./search-by-date.component.scss']
})
export class SearchByDateComponent {
  searchForm: UntypedFormGroup = new UntypedFormGroup({});
  users: UserData[] = [];

  ngOnInit(): void {
      this.searchForm = this.formBuilder.group({
          createdAt: [getCurrentDateString(), [Validators.required]],
          userId: [0, [Validators.required, Validators.min(1)]]
      });
      this.api.retrieve<UserData[]>('users')
          .pipe(retry(3))
          .subscribe((data) => this.users = data);

      try {
          const id = Number(this.route.snapshot.paramMap.get('id'));
          console.log('id : ', id);
          if (!!id) {
              this.store.selectInvoice(id);
          }
      } catch (e) {
          console.log('No Param Found');
      }
  }

  onSubmit(): void {
      this.store.fetchUsingUserId(
          this.createdAtField.value,
          this.userIdField.value
      ).subscribe({
        next: (value) => {
            console.log('OnSubmit', value);
            if (value) {
                this.router.navigate(['/auth', 'invoices', 'view']);
            }
        }
      })
  }

  get createdAtField(): UntypedFormControl {
      return this.searchForm.get('createdAt') as UntypedFormControl;
  }

  get date(): string {
      return this.createdAtField.value;
  }

  get userIdField(): UntypedFormControl {
      return this.searchForm.get('userId') as UntypedFormControl;
  }

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: UntypedFormBuilder,
      private api: ApiService,
      private store: SearchInvoiceStoreService) { }
}

interface UserData {
  id: number;
  name: string;
}
