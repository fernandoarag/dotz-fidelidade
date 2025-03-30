import type React from "react";
import * as S from "./styles";

export interface OrderStatusBadgeProps {
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED";
}

const statusLabelsEnum = {
  PENDING: "Pendente",
  PROCESSING: "Em processamento",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
};

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
}) => {
  return <S.Badge status={status}>{statusLabelsEnum[status]}</S.Badge>;
};
