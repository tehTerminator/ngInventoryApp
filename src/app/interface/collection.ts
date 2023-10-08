import { Entity } from "./entity.interface";
import { Ledger } from './ledger.ts';

export interface BalanceSnapshot extends Entity{
    ledger_id: number;
    ledger: Ledger;
    opening: number;
    closing: number;
}