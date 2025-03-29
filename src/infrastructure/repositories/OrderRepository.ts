import type { Order } from '../../core/domain/entities/Order';
import type { IOrderRepository } from '../../core/domain/repositories/IOrderRepository';
import { AxiosHttpClient } from '../http/AxiosHttpClient';

export class OrderRepository implements IOrderRepository {
  private http = AxiosHttpClient.getInstance();

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
    const response = await this.http.post<Order>('/orders', order);
    return response.data;
  }

  async getUserOrders(): Promise<Order[]> {
    const response = await this.http.get<Order[]>('/orders');
    return response.data;
  }

  async getOrderById(orderId: string): Promise<Order> {
    const response = await this.http.get<Order>(`/orders/${orderId}`);
    return response.data;
  }
}
