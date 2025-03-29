import type { OrderProduct } from './OrderProduct';

export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  totalPoints: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  addressId: string;
  createdAt: Date;
}
