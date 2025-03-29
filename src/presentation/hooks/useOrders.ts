import { useEffect, useState } from 'react';
import type { Order } from '../../core/domain/entities/Order';
import { OrderRepository } from '../../infrastructure/repositories/OrderRepository';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const orderRepository = new OrderRepository();
        const ordersData = await orderRepository.getUserOrders();

        // Ordenar por data (mais recentes primeiro)
        const sortedOrders = [...ordersData].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setOrders(sortedOrders);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar pedidos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getOrderById = async (orderId: string) => {
    try {
      setLoading(true);
      const orderRepository = new OrderRepository();
      const order = await orderRepository.getOrderById(orderId);
      return order;
    } catch (err) {
      setError('Erro ao carregar detalhes do pedido');
      console.error(err);
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
  };
};
