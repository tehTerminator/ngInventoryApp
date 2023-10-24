import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from './../../../../services/api/api.service';
import { GroupForm } from './group.form';
import { NotificationsService } from './../../../../services/notification/notification.service';
import { ProductGroup } from './../../../../interface/product-group';
import { Observable, Subscription, finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groups-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupsFormComponent implements OnInit, OnDestroy {
  form = new GroupForm();
  private _loading = false;
  private _sub = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private notice: NotificationsService
  ) {}

  ngOnInit(): void {
    this._sub = this.route.paramMap.subscribe({
      next: (value) => {
        const id = value.get('id');
        if (!!id) {
          this.populateForm(id);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  get editMode(): boolean {
    return this.form.id > 0;
  }

  get loading(): boolean {
    return this._loading;
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this._loading = true;

    if (this.editMode) {
      this.handleResponse(this.updateGroup(this.form.value));
      return;
    }

    this.handleResponse(this.addNewGroup(this.form.value));


  }

  private addNewGroup(group: ProductGroup) {
    return this.api.create<ProductGroup>(['product-group'], group)
    .pipe(finalize(() => this._loading = false));
  }

  private updateGroup(group: ProductGroup) {
    return this.api.update<ProductGroup>(['product-group'], group)
    .pipe(finalize(() => this._loading = false));
  }

  private handleResponse(response: Observable<ProductGroup>): void {
    response.subscribe({
      next: (value) => {
        let message = `Group ${value.title} Created.`;
        if (this.editMode) {
          message = `Group ${value.title} Updated`;
        }
        this.notice.show(message);
        this.form.reset();
      },
      error: () => {
        this.notice.show('Error Occurred');
      }
    })
  }

  private populateForm(id: string) {
    this._loading = true;
    this.api
      .retrieve<ProductGroup>(['get', 'product-group', id])
      .pipe(finalize(() => (this._loading = false)))
      .subscribe({
        next: (value) =>
          this.form.patchValue({
            id: value.id,
            title: value.title,
          }),
      });
  }
}
