import { Entity } from "../../../../../../interface/entity.interface";
import { Ledger } from "../../../../../../interface/ledger";
import { Voucher } from "../../../../../../interface/voucher";

export class Cashbook {
    private _ledger: Ledger;
    private _rows: CashbookRow[] = [];

    constructor(ledger: Ledger, vouchers: Voucher[], private openingBalance = 0) {
        this._ledger = ledger;
        this._rows = [];
        vouchers.forEach(item => this.generateRow(item));
    }

    private generateRow(voucher: Voucher): void {
        let transfer = voucher.creditor.title;
        if (voucher.cr === this._ledger.id) {
            transfer = voucher.debtor.title;
        }
        const row: CashbookRow = {
            id: voucher.id,
            date: voucher.created_at || '',
            transfer,
            narration: voucher.narration,
            cr: 0,
            dr: 0,
            balance: 0
        };

        let prevBalance = 0;
        if (this._rows.length === 0) {
            this.generateInitialRow();
        }
        prevBalance = this._rows[this._rows.length - 1].balance;
        if (this._ledger.id === voucher.creditor.id) {
            row.balance = prevBalance - voucher.amount;
            row.cr = voucher.amount;
        } else {
            row.balance = prevBalance + voucher.amount;
            row.dr = voucher.amount;
        }
        this._rows.push(row);
    }

    private generateInitialRow(): void {
        const row: CashbookRow = {
            id: 0,
            date: '',
            transfer: 'Previous Day',
            narration: 'Opening Balance',
            cr: 0,
            dr: 0,
            balance: 0
        };
        row.balance = this.openingBalance;
        row.dr = this.openingBalance;
        this._rows.push(row);
    }

    get rows(): CashbookRow[] {
        return this._rows;
    }
}

export interface CashbookRow extends Entity {
  date: string;
  transfer: string;
  narration: string;
  cr: number;
  dr: number;
  balance: number;
}

export interface Statement {
  openingBalance: number;
  vouchers: Voucher[];
}
