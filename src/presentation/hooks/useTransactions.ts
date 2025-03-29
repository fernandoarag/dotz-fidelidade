import { useEffect, useState } from 'react';
import type { Transaction } from '../../core/domain/entities/Transaction';
import { TransactionRepository } from '../../infrastructure/repositories/TransactionRepository';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pointsBalance, setPointsBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const transactionRepository = new TransactionRepository();

        // Carregar transações e saldo de pontos
        const [transactionsData, balance] = await Promise.all([
          transactionRepository.getUserTransactions(),
          transactionRepository.getUserPointsBalance(),
        ]);

        // Ordenar transações por data (mais recentes primeiro)
        const sortedTransactions = [...transactionsData].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setTransactions(sortedTransactions);
        setPointsBalance(balance);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar transações');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return {
    transactions,
    pointsBalance,
    loading,
    error,
  };
};
