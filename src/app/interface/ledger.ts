import { Entity } from "./entity.interface";

export interface Ledger extends Entity {
  title: string;
  groupId: number;
  canReceivePayment: boolean;
  kind: 'BANK' | 'WALLET' | 'DEPOSITS' | 'CASH' | 'PAYABLE' | 'RECEIVABLE' | 'EXPENSES' | 'INCOME';
}

export const EMPTYLEDGER: Ledger = Object.freeze({
  title: '',
  groupId: 0,
  canReceivePayment: false,
  kind: 'BANK',
  id: 0
});

