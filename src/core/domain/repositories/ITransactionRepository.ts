import type { Transaction } from '../entities/Transaction';

export interface ITransactionRepository {
  getUserTransactions(): Promise<Transaction[]>;
  getUserPointsBalance(): Promise<number>;
}
