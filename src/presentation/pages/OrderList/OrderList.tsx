import { Button } from "@components/common/Button/Button";
import { OrderStatusBadge } from "@components/features/OrderStatusBadge/OrderStatusBadge";
import { useOrders } from "@hooks/useOrders";
import type React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";

export const OrderList: React.FC = () => {
  const { orders, loading, error } = useOrders();

  // Formatar data
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return <S.LoadingState>Carregando pedidos...</S.LoadingState>;
  }

  return (
    <div>
      <S.PageTitle>Meus Pedidos</S.PageTitle>

      {error && <S.ErrorState>{error}</S.ErrorState>}

      {orders.length === 0 ? (
        <S.EmptyState>
          <h3>Nenhum pedido encontrado</h3>
          <p>Você ainda não resgatou nenhum produto.</p>
          <Button as={Link} to="/products" style={{ marginTop: "16px" }}>
            Ver Catálogo
          </Button>
        </S.EmptyState>
      ) : (
        orders.map((order) => (
          <S.OrderCard key={order.id}>
            <S.OrderHeader>
              <div>
                <S.OrderNumber>Pedido #{order.id.slice(-6)}</S.OrderNumber>
                <S.OrderDate>{formatDate(order.createdAt)}</S.OrderDate>
              </div>
              <OrderStatusBadge status={order.status} />
            </S.OrderHeader>

            <S.ProductList>
              {order.products.map((item) => (
                <S.ProductItem key={item.productId}>
                  <S.ProductQuantity>{item.quantity}x</S.ProductQuantity>
                  <span>
                    {item.product?.name ||
                      `Produto #${item.productId.slice(-6)}`}
                  </span>
                </S.ProductItem>
              ))}
            </S.ProductList>

            <S.OrderFooter>
              <S.OrderPoints>Total: {order.totalPoints} pts</S.OrderPoints>
              <Button
                as={Link}
                to={`/orders/${order.id}`}
                variant="outline"
                size="small"
              >
                Ver detalhes
              </Button>
            </S.OrderFooter>
          </S.OrderCard>
        ))
      )}
    </div>
  );
};
