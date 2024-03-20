import { Entity } from "./entity.interface";
import { Ledger } from './ledger';

export interface Voucher extends Entity {
    cr: number;
    dr: number;
    narration: string;
    amount: number;
    user_id: number;
    state: boolean;
    creditor: Ledger;
    debtor: Ledger;
}