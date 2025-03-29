import type { Product } from './Product';

export interface OrderProduct {
  productId: string;
  quantity: number;
  pointsPrice: number;
  product?: Product; // Referência ao produto completo
}
