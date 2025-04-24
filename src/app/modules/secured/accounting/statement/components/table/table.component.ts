import { Component, OnInit } from '@angular/core';
import { CashbookRow } from './Cashbook';
import { Observable, Subscription, map } from 'rxjs';
import { StatementService } from '../../statement-service/statement.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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
    console.log('splitText', narration);
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
    return this.statementService.statement().rows;
  }
}
