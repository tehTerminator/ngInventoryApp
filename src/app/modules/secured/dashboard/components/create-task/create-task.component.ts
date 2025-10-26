import { Component, signal, computed, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from 'src/app/services/api/api.service';
import { TaskFormGroup } from './TaskFormGroup';
import { Contact } from 'src/app/interface/contact.interface';
import { finalize, startWith } from 'rxjs';
import { NotificationsService } from 'src/app/services/notification/notification.service';
import { MatChipsModule } from "@angular/material/chips";
import { Category } from 'src/app/interface/Category.interface';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from 'src/app/modules/core/core.module';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-task',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    CoreModule
],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  standalone: true
})
export class CreateTaskComponent implements AfterViewInit {
  taskFormGroup = new TaskFormGroup();
  #fetchedCategories = signal<Category[]>([]);
  #loading = signal<boolean>(false);
  loading = computed(() => this.#loading());

  categories = computed(() => this.#fetchedCategories());
  constructor(private api: ApiService, private notificationService: NotificationsService) {}

  ngAfterViewInit(): void {
    this.taskFormGroup.categoryFC.valueChanges.pipe(
      startWith('')
    )
    .subscribe({
      next: (value) => {
        if (value.length >= 3) {
          this.#fetchCategoryByName(value);
        }
      }
    });
  }

  #fetchCategoryByName(value: string) {
    this.api.retrieve<Category[]>(['categories', 'where-title'], {title: value})
    .subscribe({
      next: (categories => this.#fetchedCategories.set(categories)),
      error: () => {
        this.#fetchedCategories.set([{id: 0, title: value}]);
        this.notificationService.show('Category Does Not Exists')
      }
    });
  }

  categoryDisplayFn(category: Category) {
    return category && category.title ? category.title : '';
  }

  categorySelected(event: MatAutocompleteSelectedEvent) {
    this.taskFormGroup.categoryFC.setValue(event.option.value);
  }

  onMobileFieldBlur() {
    const mobile = this.taskFormGroup.mobile;
    if (mobile.length !== 10) {
      return;
    }

    this.api.retrieve<Contact>('contact', {mobile})
    .pipe(finalize(() => {
      this.#loading.set(false);
    }))
    .subscribe({
        next: (value => {
          this.taskFormGroup.customerFC.setValue(value.title);
        }),
        error: (() => {
          this.notificationService.show('Customer Not Found');
        })
      })
  }

  onSubmit() {
    if (this.taskFormGroup.invalid) {
      this.notificationService.show('Error in Form Data');
      return;
    }

    this.api.create('task', this.taskFormGroup.value)
    .subscribe({next: (() => this.notificationService.show('Task Created Success'))});
  }
}
