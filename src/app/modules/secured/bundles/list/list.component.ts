import { Component, OnInit } from '@angular/core';
import { BundleService } from './../../../../services/bundle/bundle.service';
import { NotificationsService } from './../../../../services/notification/notification.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Bundle } from './../../../../interface/bundles';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(private bundleService: BundleService, private notification: NotificationsService) {}

  ngOnInit(): void {
    this.bundleService.init();
  }

  get bundles$(): Observable<Bundle[]> {
    return this.bundleService.getAsObservable();
  }

  get isEmpty(): Observable<boolean> {
    return this.bundleService.getAsObservable().pipe(map(data => data.length === 0));
  }
}