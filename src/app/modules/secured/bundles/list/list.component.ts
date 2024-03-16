import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../../services/api/api.service';
import { NotificationsService } from './../../../../services/notification/notification.service';
import { BehaviorSubject } from 'rxjs';
import { Bundle } from './../../../../interface/bundles';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  bundles$ = new BehaviorSubject<Bundle[]>([]);
  constructor(private api: ApiService, private notification: NotificationsService) {}

  ngOnInit(): void {
    this.api.retrieve<Bundle[]>('bundles')
    .subscribe({
      next: (data => {
        console.log(data);
        this.bundles$.next(data)
      }),
      error: (() => this.notification.show('Unable to Retrieve Bundles'))
    });

  }

  get listEmpty(): boolean {
    return this.bundles$.value.length === 0;
  }
}