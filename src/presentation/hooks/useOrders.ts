// src/presentation/hooks/useOrders.ts
import { useCallback, useEffect, useState } from 'react';
import type { Order } from '../../core/domain/entities/Order';
import { OrderRepository } from '../../infrastructure/repositories/OrderRepository';

// Interface para capturar erros de rede/API
interface ApiError extends Error {
  statusCode?: number;
  isNetworkError?: boolean;
}

/**
 * Hook para gerenciamento de pedidos
 * Implementa proteções contra dados quebrados e loops infinitos
 */
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchAttempts, setFetchAttempts] = useState(0);

  // Função para verificar se um objeto Order é válido
  const isValidOrder = (order: any): order is Order => {
    return (
      order &&
      typeof order === 'object' &&
      typeof order.id === 'string' &&
      typeof order.status === 'string' &&
      Array.isArray(order.products) &&
      (typeof order.totalPoints === 'number' || typeof order.totalPoints === 'string') &&
      typeof order.addressId === 'string'
    );
  };

  // Função para verificar se uma lista de Orders é válida
  const areValidOrders = (data: any[]): data is Order[] => {
    return Array.isArray(data) && data.every(isValidOrder);
  };

  // Função para buscar pedidos, com verificação de validade e proteção contra loops
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      // Proteção contra muitas tentativas (possível loop)
      if (fetchAttempts > 3) {
        setError('Número máximo de tentativas excedido. Por favor, recarregue a página.');
        setLoading(false);
        return;
      }

      setFetchAttempts(prev => prev + 1);

      const orderRepository = new OrderRepository();
      const ordersData = await orderRepository.getUserOrders();

      // Validar os dados recebidos
      if (!areValidOrders(ordersData)) {
        console.error('Dados inválidos recebidos da API:', ordersData);
        setError('Os dados recebidos do servidor estão em formato inválido.');
        setOrders([]);
        setLoading(false);
        return;
      }

      // Ordenar por data (mais recentes primeiro)
      const sortedOrders = [...ordersData].sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setOrders(sortedOrders);
      setError(null);
    } catch (err) {
      const apiError = err as ApiError;
      let errorMessage = 'Erro ao carregar pedidos';

      // Tratamento específico para erros de rede
      if (apiError.isNetworkError) {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      } else if (apiError.statusCode === 401) {
        errorMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
      }

      setError(errorMessage);
      console.error('Erro ao buscar pedidos:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [fetchAttempts]);

  // Efeito para buscar pedidos ao montar o componente
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Função para buscar um pedido específico
  const getOrderById = async (orderId: string) => {
    try {
      setLoading(true);

      const orderRepository = new OrderRepository();
      const order = await orderRepository.getOrderById(orderId);

      console.log(order);

      // Validar o pedido recebido
      if (!isValidOrder(order)) {
        console.error('Pedido em formato inválido recebido da API:', order);
        setError('Os dados do pedido estão em formato inválido.');
        return null;
      }

      return order;
    } catch (err) {
      const apiError = err as ApiError;
      let errorMessage = 'Erro ao carregar detalhes do pedido';

      if (apiError.statusCode === 404) {
        errorMessage = 'Pedido não encontrado';
      }

      setError(errorMessage);
      console.error('Erro ao buscar detalhes do pedido:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    getOrderById,
    refetch: fetchOrders, // Expor função para recarregar pedidos manualmente
  };
};
