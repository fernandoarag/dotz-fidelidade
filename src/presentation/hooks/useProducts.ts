// src/presentation/hooks/useProducts.ts
import { useEffect, useState } from 'react';
import { GetProductsUseCase } from '../../application/useCases/product/GetProductsUseCase';
import type { Category } from '../../core/domain/entities/Category';
import type { Product } from '../../core/domain/entities/Product';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';

interface ProductsFilters {
  categoryId?: string;
  search?: string;
  minPoints?: number;
  maxPoints?: number;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductsFilters>({});

  const productRepository = new ProductRepository();
  const getProductsUseCase = new GetProductsUseCase(productRepository);

  // Carregar categorias
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await productRepository.getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError('Erro ao carregar categorias');
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // Carregar produtos com filtros
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProductsUseCase.execute(filters);
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // Função para atualizar filtros
  const updateFilters = (newFilters: Partial<ProductsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Função para resetar filtros
  const resetFilters = () => {
    setFilters({});
  };

  return {
    products,
    categories,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
  };
};
