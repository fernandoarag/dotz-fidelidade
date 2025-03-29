import type { Transaction } from '../../core/domain/entities/Transaction';
import type { ITransactionRepository } from '../../core/domain/repositories/ITransactionRepository';
import { AxiosHttpClient } from '../http/AxiosHttpClient';

export class TransactionRepository implements ITransactionRepository {
  private http = AxiosHttpClient.getInstance();

  async getUserTransactions(): Promise<Transaction[]> {
    const response = await this.http.get<Transaction[]>('/transactions');
    return response.data;
  }

  async getUserPointsBalance(): Promise<number> {
    const response = await this.http.get<{ balance: number }>('/users/points-balance');
    return response.data.balance;
  }
}
