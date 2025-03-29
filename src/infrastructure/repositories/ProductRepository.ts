import type { Category } from '../../core/domain/entities/Category';
import type { Product } from '../../core/domain/entities/Product';
import type { IProductRepository } from '../../core/domain/repositories/IProductRepository';
import { AxiosHttpClient } from '../http/AxiosHttpClient';

export class ProductRepository implements IProductRepository {
  private http = AxiosHttpClient.getInstance();

  async getProducts(filters?: {
    categoryId?: string;
    search?: string;
    minPoints?: number;
    maxPoints?: number;
  }): Promise<Product[]> {
    const response = await this.http.get<Product[]>('/products', { params: filters });
    return response.data;
  }

  async getProductById(productId: string): Promise<Product> {
    const response = await this.http.get<Product>(`/products/${productId}`);
    return response.data;
  }

  async getCategories(): Promise<Category[]> {
    const response = await this.http.get<Category[]>('/categories');
    return response.data;
  }
}
