import type { IOrderRepository } from '../../core/domain/repositories/IOrderRepository';
import type { Order } from '../../core/domain/entities/Order';
import { AxiosHttpClient } from '../http/AxiosHttpClient';

export class OrderRepository implements IOrderRepository {
  private http = AxiosHttpClient.getInstance();

  /**
   * Método para normalizar datas em um objeto (convertendo strings para Date)
   * @param obj Objeto a ser normalizado
   * @returns Objeto com datas convertidas
   */
  private normalizeDates<T>(obj: T): T {
    // Caso base: se for null, undefined ou não-objeto
    if (obj === null || obj === undefined || typeof obj !== 'object') {
      return obj;
    }

    // Lidar com arrays
    if (Array.isArray(obj)) {
      return obj.map(item => this.normalizeDates(item)) as unknown as T;
    }

    // Criar uma cópia do objeto para evitar modificar o original
    const result = {} as Record<string, any>;

    // Copiar cada propriedade, normalizando valores de objeto/data
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = (obj as any)[key];

        // Converter propriedades de data
        if (key === 'createdAt' && typeof value === 'string') {
          result[key] = new Date(value);
        }
        // Processar recursivamente objetos aninhados
        else if (value !== null && typeof value === 'object') {
          result[key] = this.normalizeDates(value);
        }
        // Copiar valores primitivos diretamente
        else {
          result[key] = value;
        }
      }
    }

    return result as unknown as T;
  }

  /**
   * Depuração para verificar o resultado da normalização
   */
  private logNormalized(label: string, data: any): void {
    console.info(`${label} - Keys: ${Object.keys(data).join(', ')}`);
    if ('createdAt' in data) {
      console.info(`createdAt: ${data.createdAt} (${typeof data.createdAt})`);
    }
  }

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
    try {
      const response = await this.http.post<Order>('/orders', order);
      const normalized = this.normalizeDates(response.data);
      this.logNormalized('Create Order', normalized);
      return normalized;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error instanceof Error
        ? error
        : new Error('Falha ao criar pedido. Por favor, tente novamente.');
    }
  }

  async getUserOrders(): Promise<Order[]> {
    try {
      const response = await this.http.get<Order[]>('/orders');
      const normalized = this.normalizeDates(response.data);
      if (normalized.length > 0) {
        this.logNormalized('First Order from getUserOrders', normalized[0]);
      }
      return normalized;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error instanceof Error
        ? error
        : new Error('Falha ao buscar pedidos. Por favor, tente novamente.');
    }
  }

  async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await this.http.get<Order>(`/orders/${orderId}`);
      const normalized = this.normalizeDates(response.data);
      this.logNormalized('Order by ID', normalized);
      return normalized;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error instanceof Error
        ? error
        : new Error('Falha ao buscar detalhes do pedido. Por favor, tente novamente.');
    }
  }
}
