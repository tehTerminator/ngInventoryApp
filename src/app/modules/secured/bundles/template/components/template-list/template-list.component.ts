import { Component } from '@angular/core';
import { BundleStoreService } from './../../services/bundle-store.service';
import { Observable } from 'rxjs';
import { BundleTemplate } from '../../../../../../interface/bundles';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.scss'
})
export class TemplateListComponent {
  constructor(private store: BundleStoreService) {}

  get templates(): Observable<BundleTemplate[]> {
    return this.store.templates$;
  }

  get totalAmount(): number {
    return this.store.totalAmount;
  }
}
