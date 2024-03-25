import { Entity } from './entity.interface';

export interface Ledger extends Entity {
  title: string;
  canReceivePayment: boolean;
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

export const EMPTY_LEDGER: Ledger = Object.freeze({
  title: '',
  canReceivePayment: false,
  kind: 'BANK',
  id: 0,
});
