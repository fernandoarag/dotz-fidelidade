import type { Order } from '../entities/Order';

export interface IOrderRepository {
  createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order>;
  getUserOrders(): Promise<Order[]>;
  getOrderById(orderId: string): Promise<Order>;
}
