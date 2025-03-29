// src/presentation/hooks/useProductDetails.ts
import { useEffect, useState } from 'react';
import type { Product } from '../../core/domain/entities/Product';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';
import { TransactionRepository } from '../../infrastructure/repositories/TransactionRepository';

export const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [pointsBalance, setPointsBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productRepository = new ProductRepository();
  const transactionRepository = new TransactionRepository();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        // Carregar produto e saldo de pontos em paralelo
        const [productData, balance] = await Promise.all([
          productRepository.getProductById(productId),
          transactionRepository.getUserPointsBalance(),
        ]);

        setProduct(productData);
        setPointsBalance(balance);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar detalhes do produto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return {
    product,
    pointsBalance,
    loading,
    error,
    hasEnoughPoints: product ? pointsBalance >= product.pointsPrice : false,
  };
};
