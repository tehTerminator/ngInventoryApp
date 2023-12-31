import { Component, OnInit } from '@angular/core';
import { CashbookRow } from './Cashbook';
import { Observable, Subscription, map } from 'rxjs';
import { StatementService } from '../../statement-service/statement.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  rowCount = 0;
    sub: Subscription = new Subscription();

    constructor(private statementService: StatementService) { }

    ngOnInit(): void {
        this.sub = this.statementService.cashbook
            .subscribe(
                data => {
                    if (!!data) {
                        this.rowCount = data.rows.length;
                    } else {
                        this.rowCount = 0;
                    }
                }
            );
    }

    splitText(narration: string): string[] {
        if (narration.indexOf('#') >= 0){
            const sp = narration.split('#');
            if (sp.length === 2 && !isNaN(+sp[1])) {
                return sp;
            }
        }
        return [narration, ''];
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    get rows(): Observable<CashbookRow[]> {
        return this.statementService.cashbook
            .pipe(map(cashbook => {
                return cashbook.rows;
            }));
    }
}

