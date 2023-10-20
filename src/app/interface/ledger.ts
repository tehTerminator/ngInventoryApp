import { Entity } from "./entity.interface";

export interface Ledger extends Entity {
  title: string;
  groupId: number;
  canReceivePayment: boolean;
  kind: 'BANK' | 'WALLET' | 'DEPOSITS' | 'CASH' | 'PAYABLE' | 'RECEIVABLE' | 'EXPENSES' | 'INCOME';
}