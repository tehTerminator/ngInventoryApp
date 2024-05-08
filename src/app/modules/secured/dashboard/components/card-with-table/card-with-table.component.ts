import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiService } from '../../../../../services/api/api.service';

@Component({
  selector: 'app-card-with-table',
  templateUrl: './card-with-table.component.html',
})
export class CardWithTableComponent {
  @Input() title = '';
  @Input() colTitleText = '';
  @Input() colValueText = '';
  @Input() dataUrl = '';

  data: DataItem[] = [];

  loading = false;

  constructor(private api: ApiService) {}

  ngAfterViewInit(): void {
    if (this.dataUrl.length > 0) {
      this.loading = true;
      this.api
        .retrieve<DataItem[]>(this.dataUrl)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({ next: (value) => (this.data = value) });
    }
  }
}

interface DataItem {
  key: string;
  value: number;
}
