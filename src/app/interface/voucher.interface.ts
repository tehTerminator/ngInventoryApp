import { Entity } from "./entity.interface";
import { EMPTY_LEDGER, Ledger } from './ledger.interface';

export interface Voucher extends Entity {
    cr: number;
    dr: number;
    narration: string;
    amount: number;
    user_id: number;
    creditor: Ledger;
    debtor: Ledger;
}

export const EMPTY_VOUCHER: Voucher = Object.freeze({
    id: 0,
    cr: 0,
    dr: 0,
    narration: '',
    amount: 0,
    user_id: 0,
    creditor: EMPTY_LEDGER,
    debtor: EMPTY_LEDGER,
})