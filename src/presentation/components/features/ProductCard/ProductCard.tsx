import { Button } from "@components/common/Button/Button";
import type { Product } from "@core/domain/entities/Product";
import type React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <S.Card>
      <S.ImageContainer>
        <S.ProductImage src={product.imageUrl} alt={product.name} />
        <S.PointsBadge>{product.pointsPrice} pts</S.PointsBadge>
        {!product.available && (
          <S.UnavailableBadge>Indisponível</S.UnavailableBadge>
        )}
      </S.ImageContainer>
      <S.Content>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductDescription>{product.description}</S.ProductDescription>
        <S.CardFooter>
          <Button
            as={Link}
            to={`/products/${product.id}`}
            variant={product.available ? "primary" : "outline"}
            disabled={!product.available}
            fullWidth
          >
            {product.available ? "Ver detalhes" : "Indisponível"}
          </Button>
        </S.CardFooter>
      </S.Content>
    </S.Card>
  );
};
