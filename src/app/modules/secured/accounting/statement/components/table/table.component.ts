import { Component } from '@angular/core';
import { CashbookRow } from '../../statement-service/statement.service';
import { StatementService } from '../../statement-service/statement.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: false
})
export class TableComponent {
  constructor(
    private statementService: StatementService,
  ) {}

  splitWithDots(text: string) {
    return text.split('.');
  }

  splitText(narration: string): string[] {
    if (narration.indexOf('#') >= 0) {
      const sp = narration.split('#');
      if (sp.length === 2 && !isNaN(+sp[1])) {
        return sp;
      }
    }
    return [narration, ''];
  }

  hasUri(narration: string) {
    return narration.includes('#');
  }

  hasDot(narration: string) {
    return narration.includes('.');
  }

  get rows(): CashbookRow[] {
    return this.statementService.statement();
  }

  get loading() {
    return this.statementService.loading();
  }
}
