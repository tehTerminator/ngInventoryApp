import { AfterViewInit, Component, Input } from '@angular/core';
import { ApiService } from './../../../../../services/api/api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-card-with-text',
  templateUrl: './card-with-text.component.html',
  styleUrl: './card-with-text.component.scss',
})
export class CardWithTextComponent implements AfterViewInit {
  @Input() title = '';
  @Input() text = '';
  @Input() dataUrl = '';

  loading = false;

  constructor(private api: ApiService) {}

  ngAfterViewInit(): void {
    if (this.dataUrl.length > 0) {
      this.loading = true;
      this.api
        .retrieve<{ data: string | number }>(['report', this.dataUrl])
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({ next: (value) => (this.text = value.data.toString()) });
    }
  }
}
