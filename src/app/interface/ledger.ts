import { Entity } from './entity.interface';

export interface Ledger extends Entity {
  title: string;
  groupId: number;
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

export const EMPTYLEDGER: Ledger = Object.freeze({
  title: '',
  groupId: 0,
  canReceivePayment: false,
  kind: 'BANK',
  id: 0,
});
