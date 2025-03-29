import type { Product } from '../../../core/domain/entities/Product';
import type { IProductRepository } from '../../../core/domain/repositories/IProductRepository';

export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(filters?: {
    categoryId?: string;
    search?: string;
    minPoints?: number;
    maxPoints?: number;
  }): Promise<Product[]> {
    return this.productRepository.getProducts(filters);
  }
}
