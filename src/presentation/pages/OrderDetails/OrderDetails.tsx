import { Button } from "@components/common/Button/Button";
import { Flex } from "@components/common/Flex/Flex";
import { OrderStatusBadge } from "@components/features/OrderStatusBadge/OrderStatusBadge";
import type { Address } from "@core/domain/entities/Address";
import type { Order } from "@core/domain/entities/Order";
import { useOrders } from "@hooks/useOrders";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import type React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as S from "./styles";

export const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    getOrderById,
    loading: orderLoading,
    error: orderError,
  } = useOrders();

  const [order, setOrder] = useState<Order | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);

        // Buscar pedido
        const orderData = await getOrderById(id);

        if (!orderData) {
          setError("Pedido não encontrado");
          return;
        }

        setOrder(orderData);

        // Buscar endereço de entrega
        const userRepository = new UserRepository();
        const addresses = await userRepository.getAddresses();
        const deliveryAddress = addresses.find(
          (addr) => addr.id === orderData.addressId
        );

        if (deliveryAddress) {
          setAddress(deliveryAddress);
        }

        setError(null);
      } catch (err) {
        setError("Erro ao carregar detalhes do pedido");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, getOrderById]);

  // Formatar data
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Determinar quais etapas estão completas com base no status
  const getStepStatus = (status: string, step: string) => {
    const statusOrder = {
      PENDING: 0,
      PROCESSING: 1,
      SHIPPED: 2,
      DELIVERED: 3,
    };

    const stepOrder = {
      PENDING: 0,
      PROCESSING: 1,
      SHIPPED: 2,
      DELIVERED: 3,
    };

    const currentStatusIndex = statusOrder[status as keyof typeof statusOrder];
    const stepIndex = stepOrder[step as keyof typeof stepOrder];

    return {
      completed: currentStatusIndex > stepIndex,
      active: currentStatusIndex === stepIndex,
    };
  };

  if (loading || orderLoading) {
    return <S.LoadingState>Carregando detalhes do pedido...</S.LoadingState>;
  }

  if (error || orderError || !order) {
    return (
      <S.ErrorState>
        {error || orderError || "Pedido não encontrado"}
      </S.ErrorState>
    );
  }

  return (
    <div>
      <Flex justify="space-between" align="center">
        <S.PageTitle>Detalhes do Pedido</S.PageTitle>
        <Button as={Link} to="/orders" variant="outline">
          Voltar para Pedidos
        </Button>
      </Flex>

      <S.OrderSection>
        <S.OrderHeader>
          <div>
            <S.OrderNumber>Pedido #{order.id.slice(-6)}</S.OrderNumber>
            <S.OrderDate>{formatDate(order.createdAt)}</S.OrderDate>
          </div>
          <OrderStatusBadge status={order.status} />
        </S.OrderHeader>

        <S.SectionTitle>Status do Pedido</S.SectionTitle>

        <S.OrderTracker>
          {["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"].map((step) => {
            const { completed, active } = getStepStatus(order.status, step);

            return (
              <S.TrackerStep key={step} active={active} completed={completed}>
                <S.StepIcon active={active} completed={completed}>
                  {completed
                    ? "✓"
                    : step === "PENDING"
                    ? "1"
                    : step === "PROCESSING"
                    ? "2"
                    : step === "SHIPPED"
                    ? "3"
                    : "4"}
                </S.StepIcon>
                <S.StepLabel>
                  {step === "PENDING"
                    ? "Pendente"
                    : step === "PROCESSING"
                    ? "Em processamento"
                    : step === "SHIPPED"
                    ? "Enviado"
                    : "Entregue"}
                </S.StepLabel>
              </S.TrackerStep>
            );
          })}
        </S.OrderTracker>
      </S.OrderSection>

      <S.OrderSection>
        <S.SectionTitle>Produtos</S.SectionTitle>

        <S.ProductTable>
          <thead>
            <tr>
              <S.TableHeader>Produto</S.TableHeader>
              <S.TableHeader style={{ textAlign: "center" }}>
                Quantidade
              </S.TableHeader>
              <S.TableHeader style={{ textAlign: "right" }}>
                Pontos
              </S.TableHeader>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item) => (
              <tr key={item.productId}>
                <S.TableCell>
                  {item.product?.name || `Produto #${item.productId.slice(-6)}`}
                </S.TableCell>
                <S.TableCell style={{ textAlign: "center" }}>
                  {item.quantity}
                </S.TableCell>
                <S.TableCell style={{ textAlign: "right" }}>
                  {item.pointsPrice} pts
                </S.TableCell>
              </tr>
            ))}
            <S.TotalRow>
              <S.TableCell colSpan={2}>Total</S.TableCell>
              <S.TableCell style={{ textAlign: "right" }}>
                {order.totalPoints} pts
              </S.TableCell>
            </S.TotalRow>
          </tbody>
        </S.ProductTable>
      </S.OrderSection>

      <S.OrderSection>
        <S.SectionTitle>Endereço de Entrega</S.SectionTitle>

        {address ? (
          <S.AddressCard>
            <S.AddressLine>
              <strong>
                {address.street}, {address.number}
              </strong>
              {address.complement && ` - ${address.complement}`}
            </S.AddressLine>

            <S.AddressLine>{address.neighborhood}</S.AddressLine>

            <S.AddressLine>
              {address.city} - {address.state}
            </S.AddressLine>

            <S.AddressLine>CEP: {address.zipCode}</S.AddressLine>
          </S.AddressCard>
        ) : (
          <div>Endereço não encontrado</div>
        )}
      </S.OrderSection>
    </div>
  );
};
