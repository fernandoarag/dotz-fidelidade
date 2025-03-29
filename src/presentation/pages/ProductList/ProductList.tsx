import { Flex } from "@components/common/Flex/Flex";
import { ProductCard } from "@components/features/ProductCard/ProductCard";
import { ProductFilters } from "@components/features/ProductFilters/ProductFilters";
import { useProducts } from "@hooks/useProducts";
import type React from "react";
import * as S from "./styles";

export const ProductList: React.FC = () => {
  const {
    products,
    categories,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
  } = useProducts();

  return (
    <div>
      <S.PageTitle>Catálogo de Produtos</S.PageTitle>

      <Flex direction="column">
        <ProductFilters
          categories={categories}
          onFilter={updateFilters}
          onReset={resetFilters}
          initialFilters={filters}
        />

        {loading ? (
          <S.LoadingState>Carregando produtos...</S.LoadingState>
        ) : error ? (
          <S.ErrorState>{error}</S.ErrorState>
        ) : products.length === 0 ? (
          <S.EmptyState>
            <h3>Nenhum produto encontrado</h3>
            <p>Tente ajustar os filtros ou fazer uma busca diferente.</p>
          </S.EmptyState>
        ) : (
          <S.ProductsGrid>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </S.ProductsGrid>
        )}
      </Flex>
    </div>
  );
};
