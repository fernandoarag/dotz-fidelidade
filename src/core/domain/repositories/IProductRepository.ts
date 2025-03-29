import type { Category } from '../entities/Category';
import type { Product } from '../entities/Product';

export interface IProductRepository {
  getProducts(filters?: {
    categoryId?: string;
    search?: string;
    minPoints?: number;
    maxPoints?: number;
  }): Promise<Product[]>;
  getProductById(productId: string): Promise<Product>;
  getCategories(): Promise<Category[]>;
}
