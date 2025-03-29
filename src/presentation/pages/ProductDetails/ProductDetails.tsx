import { CreateOrderUseCase } from "@application/useCases/order/CreateOrderUseCase";
import { Button } from "@components/common/Button/Button";
import { Flex } from "@components/common/Flex/Flex";
import { useAuth } from "@contexts/AuthContext";
import { useProductDetails } from "@hooks/useProductDetails";
import { OrderRepository } from "@infrastructure/repositories/OrderRepository";
import { TransactionRepository } from "@infrastructure/repositories/TransactionRepository";
import type React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemStatus, setRedeemStatus] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  const { product, pointsBalance, loading, error, hasEnoughPoints } =
    useProductDetails(id || "");

  const handleRedeem = async () => {
    if (!product || !user) return;

    setIsRedeeming(true);
    setRedeemStatus(null);

    try {
      const orderRepository = new OrderRepository();
      const transactionRepository = new TransactionRepository();
      const createOrderUseCase = new CreateOrderUseCase(
        orderRepository,
        transactionRepository
      );

      // Verifique se o usuário tem endereços cadastrados
      const userRepository = new (
        await import("@infrastructure/repositories/UserRepository")
      ).UserRepository();
      const addresses = await userRepository.getAddresses();

      if (addresses.length === 0) {
        setRedeemStatus({
          type: "warning",
          message:
            "Você precisa cadastrar um endereço de entrega antes de resgatar um produto.",
        });
        return;
      }

      // Pega o endereço padrão, ou o primeiro, se não houver padrão
      const defaultAddress =
        addresses.find((addr) => addr.isDefault) || addresses[0];

      // Cria a ordem
      await createOrderUseCase.execute({
        userId: user.id,
        products: [
          {
            productId: product.id,
            quantity: 1,
            pointsPrice: product.pointsPrice,
          },
        ],
        totalPoints: product.pointsPrice,
        addressId: defaultAddress.id,
      });

      setRedeemStatus({
        type: "success",
        message:
          "Produto resgatado com sucesso! Redirecionando para seus pedidos...",
      });

      // Redireciona para a página de pedidos após 2 segundos
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (err) {
      console.error(err);
      setRedeemStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Erro ao resgatar produto. Tente novamente.",
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  if (loading) {
    return (
      <S.LoadingContainer>Carregando detalhes do produto...</S.LoadingContainer>
    );
  }

  if (error || !product) {
    return (
      <S.StatusMessage type="error">
        {error || "Produto não encontrado"}
      </S.StatusMessage>
    );
  }

  return (
    <S.Container>
      <S.ProductImageContainer>
        <S.ProductImage src={product.imageUrl} alt={product.name} />
      </S.ProductImageContainer>

      <S.ProductInfoContainer>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductDescription>{product.description}</S.ProductDescription>

        <S.PointsCard>
          <Flex justify="space-between" align="center">
            <div>
              <S.PointsLabel>Valor em pontos</S.PointsLabel>
              <S.PointsPrice>{product.pointsPrice} pts</S.PointsPrice>
            </div>
            <S.BalanceInfo>
              Seu saldo: {pointsBalance} pts
              {!hasEnoughPoints && (
                <div>Faltam {product.pointsPrice - pointsBalance} pts</div>
              )}
            </S.BalanceInfo>
          </Flex>
        </S.PointsCard>

        {redeemStatus && (
          <S.StatusMessage type={redeemStatus.type}>
            {redeemStatus.message}
          </S.StatusMessage>
        )}

        {product.available ? (
          <Button
            onClick={handleRedeem}
            disabled={!hasEnoughPoints || isRedeeming}
            fullWidth
          >
            {isRedeeming
              ? "Processando..."
              : hasEnoughPoints
              ? "Resgatar produto"
              : "Pontos insuficientes"}
          </Button>
        ) : (
          <S.UnavailableMessage>
            Este produto não está disponível para resgate no momento.
          </S.UnavailableMessage>
        )}
      </S.ProductInfoContainer>
    </S.Container>
  );
};
