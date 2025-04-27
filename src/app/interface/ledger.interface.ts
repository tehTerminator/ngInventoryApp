import { Entity } from './entity.interface';

export interface Ledger extends Entity {
  title: string;
  can_receive_payment: boolean;
  can_pay: boolean;
  kind:
    | 'CAPITAL'
    | 'BANK'
    | 'WALLET'
    | 'DEPOSIT'
    | 'CASH'
    | 'PAYABLE'
    | 'RECEIVABLE'
    | 'EXPENSE'
    | 'INCOME'
    | 'PURCHASE AC'
    | 'SALES AC'
    | 'DUTIES AND TAXES';
}

// The EMPTY_LEDGER constant is frozen using Object.freeze to ensure immutability,
// preventing accidental modifications to this default ledger object.
export const EMPTY_LEDGER: Ledger = Object.freeze({
  title: '',
  can_receive_payment: false,
  can_pay: false,
  kind: 'CASH',
  id: 0,
});
