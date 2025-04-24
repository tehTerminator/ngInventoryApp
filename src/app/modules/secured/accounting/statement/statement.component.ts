import { Component } from '@angular/core';
import { StatementService } from './statement-service/statement.service';

@Component({
    selector: 'app-statement',
    templateUrl: './statement.component.html',
    styleUrls: ['./statement.component.scss'],
    standalone: false
})
export class StatementComponent {
    constructor(private statementService: StatementService) {}

    get rowCount(): number {
        return this.statementService.statement().rows.length;
    }
}
